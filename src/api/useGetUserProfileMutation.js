import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useGetUserProfileMutation(params) {
  return useMutation({
    mutationFn: async () => {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get("http://localhost:3000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    },
    ...params,
  });
}
