import React, { useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Keyboard,
  Animated,
} from "react-native";
import { useSelector } from "react-redux"; // ✅ for accessing phone
import socket from "../../socket";
import Page from "../../components/Page";
import SendMessageField from "./components/SendMessageField";

export default function GroupChat({ route }) {
  const { GroupId } = route.params;
  const phone = useSelector((state) => state.user.phone); // ✅ get user's phone

  const keyboardHeight = useRef(new Animated.Value(0)).current;

  const isLoading = false;

useEffect(() => {
  if (!socket.connected) socket.connect();

  console.log("📡 Emitting registerUser with phone:", phone); // <- add this
  socket.emit("JoinGroupChat", GroupId);

  return () => {
    socket.emit("LeaveGroupChat", GroupId);
  };
}, [GroupId]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(keyboardHeight, {
        toValue: 340,
        duration: 175,
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
        <SendMessageField GroupChatId={GroupId} />
      </Animated.View>
    </Page>
  );
}
