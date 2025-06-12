import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BASE_URL from "../../config";

export default function useLoginMutation(params) {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/login`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Login Response:", response.data.data);
        return response.data;
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        Alert.alert("Login Failed", error.message); // ✅ Add this
        throw error;
      }
    },
    ...params,
  });
}
