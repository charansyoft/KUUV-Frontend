import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFetchUserProfileMutation = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get("http://192.168.29.75:3000/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data: response.data.data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};
