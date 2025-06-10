import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import Page from "../../components/Page";
import SendMessageField from "./components/SendMessageField";
import socket from "../../socket";

// Import Paper components and Icon
import { TouchableRipple } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BASE_URL = "http://192.168.29.75:3000";

export default function PersonalChat() {
  const route = useRoute();
  const chatId = route.params?.ChatId;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const userPhone = useSelector((state) => state.user.phone);
  const flatListRef = useRef(null);
  const [showDownArrow, setShowDownArrow] = useState(false);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("❌ No auth token found");
        return;
      }

      const response = await axios.get(`${BASE_URL}/chats/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data.data.messages);
    } catch (error) {
      console.error("❌ Error fetching messages:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const joinChatRoom = async () => {
      if (!socket.connected) {
        socket.connect();
      }

      socket.emit("joinRoom", chatId);
      console.log(`📡 Joined chat room: ${chatId}`);

      socket.on("newMessage", (newMsg) => {
        console.log("📥 New message via socket:", newMsg);
        if (isMounted) {
          setMessages((prev) => [...prev, newMsg]);
          scrollToBottomIfNeeded();
        }
      });
    };

    if (chatId) {
      fetchMessages();
      joinChatRoom();
    }

    return () => {
      isMounted = false;
      socket.emit("leaveRoom", chatId);
      console.log(`📴 Left chat room: ${chatId}`);
      socket.off("newMessage");
    };
  }, [chatId]);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    setShowDownArrow(false);
  };

  const onScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const distanceFromBottom =
      contentSize.height - (layoutMeasurement.height + contentOffset.y);
    setShowDownArrow(distanceFromBottom > 100);
  };

  const scrollToBottomIfNeeded = () => {
    if (!showDownArrow) {
      scrollToBottom();
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.createdBy?.phone === userPhone;
    return <MessageItem message={item} isMe={isMe} />;
  };

  return (
    <Page>
      {loading ? (
        <ActivityIndicator size="large" color="#4e9fff" style={{ marginTop: 20 }} />
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10, paddingBottom: 0 }}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />

 {showDownArrow && (
  <TouchableRipple
    onPress={() => {
      flatListRef.current?.scrollToEnd({ animated: true });
      setShowDownArrow(false);
    }}
    rippleColor="rgba(255, 255, 255, 0.3)"
    style={styles.downArrowButton}
    borderless
  >
    <MaterialIcons name="keyboard-arrow-down" size={32} color="#fff" />
  </TouchableRipple>
)}

        </>
      )}

      <SendMessageField PersonalChatId={chatId} />
    </Page>
  );
}

function MessageItem({ message, isMe }) {
  const { payload, createdAt, createdBy } = message;
  const text = payload?.text || message.content || "";
  const time = dayjs(createdAt).format("h:mm A");

  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.messageRight : styles.messageLeft,
      ]}
    >
      <View style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={[styles.messageText, isMe ? styles.textRight : styles.textLeft]}>
          {text}
        </Text>
        <Text style={[styles.timeText, isMe ? styles.timeRight : styles.timeLeft]}>
          {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 12,
    maxWidth: "75%",
  },
  messageRight: {
    alignSelf: "flex-end",
  },
  messageLeft: {
    alignSelf: "flex-start",
  },
  bubble: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  bubbleRight: {
    backgroundColor: "#B0B5FF",
    borderBottomRightRadius: 4,
  },
  bubbleLeft: {
    backgroundColor: "#2e2e2e",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  textRight: {
    color: "#000",
  },
  textLeft: {
    color: "#ddd",
  },
  timeText: {
    fontSize: 10,
    marginTop: 6,
  },
  timeRight: {
    color: "#333",
    textAlign: "right",
  },
  timeLeft: {
    color: "#888",
    textAlign: "left",
  },
downArrowButton: {
  position: "absolute",
  bottom:95,
  right: 16,
  backgroundColor: "#000",
  width: 70,
  height: 50,
  borderRadius: 26,
  borderColor:"#fff",
  borderWidth:0.8,
  justifyContent: "center",
  alignItems: "center",
  
  // MUI style shadows
  shadowColor: "#000",
  shadowOpacity: 0.5,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 8,
  elevation: 8,
},

});
