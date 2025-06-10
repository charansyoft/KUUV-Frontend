// src/api/chats/personalChats/useFetchPersonalMessages.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getPersonalMessagesMutation = async (chatId) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      console.warn("No auth token found.");
      return [];
    }

    const response = await axios.get(
      `http://192.168.29.75:3000/chats/${chatId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.data?.data?.messages) {
      return response.data.data.messages;
    } else {
      console.warn("No messages found in response.");
      return [];
    }
  } catch (error) {
    console.error("❌ Error fetching personal messages:", error);
    return [];
  }
};
