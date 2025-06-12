// hooks/getGroupMessagesMutation.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import BASE_URL from "../../../../config";

export const getGroupMessagesMutation = () => {
  return useMutation({
    mutationFn: async ({ GroupId }) => {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${BASE_URL}/groups/${GroupId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("📨 GROUP MESSAGES RESPONSE:", response.data); // ✅ Console log the response
      return response.data;
    },
  });
};
