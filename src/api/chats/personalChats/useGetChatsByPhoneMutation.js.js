import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector } from "react-redux";
import BASE_URL from "../../../../config"
const fetchChatsByPhone = async (phone) => {
  const token = await AsyncStorage.getItem("authToken");

  const response = await axios.get(`${BASE_URL}/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // You can also pass phone as query param if needed, e.g.
    // params: { phone },
  });

  const enrichedChats = response.data.chats || [];
  console.log("ENriched Chats:", enrichedChats);
const transformedChats = enrichedChats.map((chat) => {
  const otherUser = chat.users.find((u) => u.phone !== phone);
  return {
    id: chat._id,  // chatId
    name: otherUser?.name || "Unknown",
    otherUserPhone: otherUser?.phone || "",
    opponentUserId: otherUser?._id || "", // <-- add this
    lastMessage:
      chat.lastMessage?.payload?.text || chat.lastMessage?.text || "",
    lastMessageTime: chat.lastMessageTime
      ? new Date(chat.lastMessageTime).toLocaleTimeString()
      : "",
    profilePic: otherUser?.profilePic || null,
    Notifications: [],
    Favorite: false,
    Important: false,
    unreadCount: chat.unreadCount || 0,
  };
});


  return transformedChats;
};

export const useGetChatsByPhoneMutation = ({ onSuccess }) => {
  const phone = useSelector((state) => state.user.phone);

  return useMutation({
    mutationFn: () => fetchChatsByPhone(phone),
    onSuccess,
    onError: (error) => {
      console.error("Chat fetch error:", error.message);
    },
  });
};