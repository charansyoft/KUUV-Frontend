import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../../config";

const createChat = async ({ opponentId, message = "Hello" }) => {
  const token = await AsyncStorage.getItem("authToken");

  const response = await axios.post(
    `${BASE_URL}/chats`,
    {
      users: [opponentId], // Current user will be inferred from token
      lastMessage: { text: message, type: "msg" },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.chat.users;
};

export default function useCreateChatMutation() {
  return useMutation({
    mutationFn: createChat,
  });
}
