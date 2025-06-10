import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useLoginMutation(params) {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axios.post(
          "http://192.168.29.75:3000/auth/login",
          data
        );
        console.log("Login Response:", response.data.data);
        return response.data;
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
      }
    },
    ...params,
  });
}
