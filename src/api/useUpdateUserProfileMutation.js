import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUpdateUserProfileMutation = async ({
  phoneNumber,
  name,
  description,
  profileImage, // Optional, can be undefined or null
}) => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authentication token is missing. Please log in again.");
  }

  const formData = new FormData();
  formData.append("phoneNumber", phoneNumber);
  if (name) formData.append("name", name);
  if (description) formData.append("description", description);

  if (profileImage) {
    formData.append("profileImage", {
      uri: profileImage.uri,
      type: profileImage.type || "image/jpeg",
      name: profileImage.fileName || "profile.jpg",
    });
  }

  const response = await axios.patch(
    "http://localhost:3000/users/profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
