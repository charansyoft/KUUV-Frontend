import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Page from "../../components/Page";
import SendMessageField from "./components/SendMessageField";
import ProfilePopup from "./components/ProfilePopUp";
import Post from "./components/Post";
import Message from "./components/Message";
import { useAppTheme } from "../../../themeContext";
import socket from "../../socket";
import { getGroupMessagesMutation } from "../../api/chats/groupChats/getGroupMessagesMutation";
import { useGroupPostExpressInterest } from "../../api/chats/groupChats/useGroupPostExpressInterest";

export default function GroupChat({ route }) {
  const navigation = useNavigation();
  const { GroupId } = route.params;
  const phone = useSelector((state) => state.user.phone);
  const { theme } = useAppTheme();
  const { mutate: fetchMessages, data, isLoading } = getGroupMessagesMutation();
  const { mutateAsync: expressInterest } = useGroupPostExpressInterest();

  const [liveMessages, setLiveMessages] = useState([]);
  const [visibleProfileId, setVisibleProfileId] = useState(null);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const flatListRef = useRef(null);
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const didInitialScroll = useRef(false);

  useEffect(() => {
    if (GroupId) {
      fetchMessages({ GroupId });
      setLiveMessages([]);
      didInitialScroll.current = false;
    }
  }, [GroupId, fetchMessages]);

  useEffect(() => {
    if (!GroupId) return;
    if (!socket.connected) socket.connect();
    socket.emit("JoinGroupChat", GroupId);

    const handleNewMessage = (message) => {
      if (!message) return;
      if (
        (message.type === "msg" && message.Message?.trim()) ||
        message.type === "post"
      ) {
        setLiveMessages((prev) => [...prev, message]);
        if (isAtBottom) {
          scrollToBottom();
        } else {
          setNewMessageCount((count) => count + 1);
        }
      }
    };

    socket.on("newGroupMessage", handleNewMessage);

    return () => {
      socket.emit("LeaveGroupChat", GroupId);
      socket.off("newGroupMessage", handleNewMessage);
    };
  }, [GroupId, isAtBottom]);

  const apiMessages = data?.data?.messages || [];
  const allMessages = [...apiMessages, ...liveMessages];

  useEffect(() => {
    if (allMessages.length === 0 || didInitialScroll.current === true) return;
    setTimeout(() => {
      scrollToBottom(false);
      didInitialScroll.current = true;
    }, 50);
  }, [allMessages]);

  const scrollToBottom = (animated = true) => {
    if (!allMessages.length) return;
    flatListRef.current?.scrollToIndex({
      index: allMessages.length - 1,
      animated,
      viewPosition: 1,
    });
    setNewMessageCount(0);
    setIsAtBottom(true);
  };

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const bottomOffset =
      contentSize.height - layoutMeasurement.height - contentOffset.y;
    if (bottomOffset < 60) {
      setIsAtBottom(true);
      setNewMessageCount(0);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(keyboardHeight, {
        toValue: 220,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleExpressInterest = async (post) => {
    try {
      const response = await expressInterest(post);
      console.log("✅ Expressed Interest:", response);
    } catch (error) {
      console.error("❌ Express Interest error:", error.message);
    }
  };

  const handleShare = (post) => {
    console.log("📤 Share Post ID:", post._id);
  };

  const handleChatPress = (chatData) => {
    const opponent = chatData.find((user) => user.phone !== phone);
    navigation.navigate("PersonalChat", { opponentId: opponent._id });
  };

  const closeModal = () => setVisibleProfileId(null);

  const renderItem = ({ item }) => {
    const isMe = item.createdBy?.phone?.toString() === phone?.toString();
    const onPressMessage = () => console.log("🧍 CreatedBy:", item.createdBy);
    const onProfilePress = () => setVisibleProfileId(item.createdBy?._id);

    if (item.type === "msg") {
      return (
        <Message
          item={item}
          isMe={isMe}
          onPress={onPressMessage}
          onProfilePress={onProfilePress}
        />
      );
    }

    if (item.type === "post") {
      return (
        <Post
          item={item}
          isMe={isMe}
          onPressMessage={onPressMessage}
          onProfilePress={onProfilePress}
          onExpressInterest={handleExpressInterest}
          onShare={handleShare}
        />
      );
    }

    return null;
  };

  return (
    <Page>
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color="#999" />
        </View>
      )}

      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "flex-end",
          paddingBottom: keyboardHeight,
        }}
      >
        <FlatList
          ref={flatListRef}
          data={allMessages}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 12,
            backgroundColor: theme.BackGround,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={20}
          onScroll={handleScroll}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              flatListRef.current?.scrollToOffset({
                offset: info.averageItemLength * info.index,
                animated: false,
              });
            }, 500);
          }}
        />

        {newMessageCount > 0 && !isAtBottom && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 80,
              alignSelf: "center",
              backgroundColor: "#1E90FF",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              zIndex: 5,
            }}
            onPress={() => scrollToBottom()}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              ↓ {newMessageCount} New Message{newMessageCount > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        )}

        <SendMessageField GroupChatId={GroupId} />
      </Animated.View>

      <ProfilePopup
        visible={!!visibleProfileId}
        onClose={closeModal}
        userId={visibleProfileId}
        onChatPress={handleChatPress}
      />
    </Page>
  );
}
