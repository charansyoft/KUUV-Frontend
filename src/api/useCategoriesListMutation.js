import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCategoriesListMutation = async (locationId) => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) throw new Error("No token found");

  const response = await axios.get("http://localhost:3000/categories", {
    params: { locationId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
