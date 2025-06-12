import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import Page from "../../components/Page";
import SendMessageField from "./components/SendMessageField";
import socket from "../../socket";
import { useAppTheme } from "../../../themeContext";
import { TouchableRipple } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BASE_URL from "../../../config";


export default function PersonalChat() {
  const { theme } = useAppTheme();
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
    return <MessageItem message={item} isMe={isMe} theme={theme} />;
  };

  return (
    <Page >
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
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
            style={{backgroundColor:theme.BackGround}}
          />

          {showDownArrow && (
            <TouchableRipple
              onPress={scrollToBottom}
              rippleColor="#fff"
              borderless
              style={{
                position: "absolute",
                bottom: 95,
                right: 16,
                backgroundColor:theme.BackGround,
                width: 70,
                height: 50,
                borderRadius: 26,
                borderColor: theme.LineColor,
                borderWidth: 0.8,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: theme.ModeText1,
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <MaterialIcons name="keyboard-arrow-down" size={30} color={theme.Icon} />
            </TouchableRipple>
          )}
        </>
      )}
      <SendMessageField PersonalChatId={chatId} />
    </Page>
  );
}

function MessageItem({ message, isMe, theme }) {
  const { payload, createdAt } = message;
  const text = payload?.text || message.content || "";
  const time = dayjs(createdAt).format("h:mm A");

  return (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 12,
        maxWidth: "75%",
        alignSelf: isMe ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={{
          borderRadius: 16,
          paddingVertical: 10,
          paddingHorizontal: 14,
          backgroundColor: isMe ? theme.SpecialBackGround : "#e0e0e0",
          borderBottomRightRadius: isMe ? 4 : 16,
          borderBottomLeftRadius: !isMe ? 4 : 16,
          
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 22,
            color: isMe ? "rgb(0, 0, 0)" : "rgb(0, 0, 0)",
          }}
        >
          {text}
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginTop: 6,
            color: isMe ?"rgba(0, 0, 0, 0.50)" : "#888",
            textAlign: isMe ? "right" : "left",
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
}
