import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

const { width } = Dimensions.get("window");

const PostComposer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { GroupId } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState("day");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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
        `http://192.168.29.75:3000/PostInGroupChats?GroupId=${GroupId}`,
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.priceButton}
          onPress={() => setPrice(Math.max(0, price - 1))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.price}>{price}</Text>
        <TouchableOpacity
          style={styles.priceButton}
          onPress={() => setPrice(price + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Price Period (e.g., day, week, month)"
        value={period}
        onChangeText={setPeriod}
      />

      <View style={styles.imageRow}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Text style={styles.imagePickerText}>Select Image</Text>
        </TouchableOpacity>

        {image && (
          <Image source={{ uri: image.uri }} style={styles.imageThumbnail} />
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && { backgroundColor: "#aaa" }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Upload Post</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 150,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  priceButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  price: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePicker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imagePickerText: {
    color: "#007bff",
    fontWeight: "500",
  },
  imagePreview: {
    width: width - 32,
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
    resizeMode: "cover",
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PostComposer;
