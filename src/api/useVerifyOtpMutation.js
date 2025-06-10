import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useVerifyOtpMutation(params) {
  return useMutation({
    mutationFn: async (data) => {
      console.log("VERIFICation mutation.js", data);
      const response = await axios.post(
        "http://192.168.29.75:3000/auth/verify",
        data
      );
      console.log("Hi", response.data.data.user);
      return response.data;
    },
    ...params,
  });
}
