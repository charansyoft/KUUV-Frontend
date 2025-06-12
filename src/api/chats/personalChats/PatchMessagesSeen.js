// src/api/chats/personalChats/patchMessagesSeen.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../../config";

export const patchMessagesSeen = async (chatId, messageIds) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) throw new Error("No token found");

    const response = await axios.patch(
      `${BASE_URL}/chats/${chatId}/MessageSeen`,
      { messageIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to patch messages seen:", error);
    return null;
  }
};
