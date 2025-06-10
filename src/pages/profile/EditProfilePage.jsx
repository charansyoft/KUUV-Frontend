import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// For Web file input fallback
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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // { uri, name, type } or File on web
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS === "web") {
      // Trigger hidden file input click on web
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
    // On web, file is a File object from input
    setImage({
      uri: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      fileObject: file, // keep actual File for upload
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
        // For web use actual File object
        formData.append("profileImage", image.fileObject, image.name);
      } else {
        // Mobile platforms: uri, name, type
        formData.append("profileImage", {
          uri: image.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      formData.append("name", name);
      formData.append("description", description);

      const res = await axios.patch(
        "http://192.168.29.75:3000/profile", // your backend URL
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#bbb"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        placeholderTextColor="#bbb"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Web hidden file input */}
      {Platform.OS === "web" && (
        <FileInput onFileSelected={handleFileSelectedWeb} />
      )}

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Select Profile Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        style={[styles.submitButton, loading && { backgroundColor: "#555" }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Update Profile</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
    color: "#fff",
  },
  imagePicker: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#555",
  },
  imagePickerText: {
    color: "#8AB4F8",
    fontWeight: "600",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfilePage;
