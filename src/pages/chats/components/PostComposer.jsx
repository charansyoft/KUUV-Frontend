import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAppTheme } from "../../../../themeContext"
import BASE_URL from "../../../../config";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
import socket from "../../../socket";
const PostComposer = () => {
  const navigation = useNavigation();
  const route = useRoute();
      const phone = useSelector((state) => state.user.phone); // ✅ get user's phone

  const { GroupId } = route.params;
  const { theme } = useAppTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState("day");
  const [loading, setLoading] = useState(false);
useEffect(() => {
  if (!socket.connected) socket.connect();

  console.log("📡 Emitting registerUser with phone:", phone); // <- add this
  socket.emit("registerUser", phone); // ✅ THIS IS CRUCIAL
  socket.emit("JoinGroupChat", GroupId);

  return () => {
    socket.emit("LeaveGroupChat", GroupId);
  };
}, [GroupId, phone]);
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    const token = await AsyncStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("profileImage", {
      uri: image.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("period", period);
    formData.append("type", "post");

    try {
      const res = await axios.post(
        `${BASE_URL}/PostInGroupChats?GroupId=${GroupId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Post uploaded successfully!");
      navigation.goBack();
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: "40%",
        backgroundColor: theme.BackGround,
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Create Post
      </Text>

      <TextInput
        style={{
          backgroundColor: theme.ModeText3,
          borderRadius: 10,
          padding: 14,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: theme.LineColor,
          fontSize: 16,
        }}
        placeholder="Post Title"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{
          backgroundColor: theme.ModeText3,
          borderRadius: 10,
          padding: 14,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: theme.LineColor,
          fontSize: 16,
          height: 100,
          textAlignVertical: "top",
        }}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor:theme.LineColor,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={() => setPrice(Math.max(0, price - 1))}
        >
          <Text style={{ fontSize: 20 }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {price}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: theme.LineColor,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={() => setPrice(price + 1)}
        >
          <Text style={{ fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={{
          backgroundColor: theme.ModeText3,
          borderRadius: 10,
          padding: 14,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: theme.LineColor,
          fontSize: 16,
        }}
        placeholder="Price Period (e.g., day, week, month)"
        value={period}
        onChangeText={setPeriod}
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: theme.ModeText1,
            borderRadius: 10,
            padding: 14,
            alignItems: "center",
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.LineColor,
          }}
        >
          <Text style={{ color: theme.ModeText2, fontWeight: "500" }}>
            Select Image
          </Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              marginLeft: 12,
              // borderWidth:1,
              // borderColor:"#fff"
            }}
          />
        )}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: loading ? "#aaa" : theme.ModeText1,
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: theme.ModeText2,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Upload Post
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostComposer;
