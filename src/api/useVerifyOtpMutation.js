import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BASE_URL from "../../config";

export default function useVerifyOtpMutation(params) {
  return useMutation({
    mutationFn: async (data) => {
      console.log("VERIFICation mutation.js", data);
      const response = await axios.post(
        `${BASE_URL}/auth/verify`,
        data
      );
      console.log("Hi", response.data.data.user);
      return response.data;
    },
    ...params,
  });
}
