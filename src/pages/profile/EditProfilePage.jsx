import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../../themeContext";
import BASE_URL from "../../../config";

const FileInput = ({ onFileSelected }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      style={{ display: "none" }}
      id="fileInput"
    />
  );
};

const EditProfilePage = () => {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS === "web") {
      document.getElementById("fileInput").click();
      return;
    }

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission denied",
        "Permission to access media library is required!"
      );
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

  const handleFileSelectedWeb = (file) => {
    setImage({
      uri: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      fileObject: file,
    });
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("Validation", "Please select a profile image.");
      return;
    }
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");
      const formData = new FormData();

      if (Platform.OS === "web") {
        formData.append("profileImage", image.fileObject, image.name);
      } else {
        formData.append("profileImage", {
          uri: image.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      formData.append("name", name);
      formData.append("description", description);

      const res = await axios.patch(
        `${BASE_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: theme?.BackGround || "#121212",
        flexGrow: 1,
      }}
    >
      <TextInput
        style={{
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme.LineColor,
          color: theme.ModeText1,
        }}
        placeholder="Name"
        placeholderTextColor={theme?.ModeText3 || "#999"}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={{
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          height: 100,
          borderWidth: 1,
          borderColor: theme.LineColor,
          color:theme.ModeText1,
        }}
        placeholder="Description"
        placeholderTextColor={theme?.ModeText3 || "#999"}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {Platform.OS === "web" && <FileInput onFileSelected={handleFileSelectedWeb} />}

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: theme.ModeText3,
          borderRadius: 8,
          padding: 12,
          alignItems: "center",
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme.LineColor,
        }}
      >
        <Text style={{ color: theme.ModeText2, fontWeight: "600" }}>
          Select Profile Image
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{
            width: "100%",
            height: 200,
            marginBottom: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.LineColor,
          }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        style={{
          backgroundColor: loading ? "#555" : theme.ModeText1,
          padding: 16,
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.ModeText1} />
        ) : (
          <Text style={{ color: theme.ModeText2, fontSize: 18, fontWeight: "bold" }}>
            Update Profile
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfilePage;
