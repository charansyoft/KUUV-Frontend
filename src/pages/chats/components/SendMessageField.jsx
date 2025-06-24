import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../../../themeContext";
import BASE_URL from "../../../../config";
import { EmojiPicker } from 'emoji-mart-native'

const SendMessageField = ({ PersonalChatId, GroupChatId }) => {
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const type = "msg";
const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPress = () => {
    Alert.alert("Coming Soon", "Emoji picker is under development.");
  };

  const handleFilePress = () => {
    if (GroupChatId) {
      navigation.navigate("PostComposer", { GroupId: GroupChatId });
    } else {
      Alert.alert("Group not found", "You can only create posts in group chats.");
    }
  };

  const sendMessage = async (url) => {
    if (!message.trim()) return;

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return Alert.alert("Error", "Authentication token missing");

      const response = await axios.post(
        url,
        { message, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Message sent:", response.data);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to send message");
    }
  };

  const handleSend = () => {
    if (GroupChatId) {
      sendMessage(`${BASE_URL}/groups/${GroupChatId}/messages`);
    } else if (PersonalChatId) {
      sendMessage(`${BASE_URL}/chats/${PersonalChatId}/messages`);
    } else {
      console.warn("No chat ID provided");
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.BackGround,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor:theme.LineColor,
          borderWidth: 1,
          padding: 10,
          borderRadius: 25,
        }}
      >
        <TouchableOpacity onPress={handleEmojiPress} style={{ marginHorizontal: 4 }}>
          <Ionicons name="happy-outline" size={25} color={theme.Icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFilePress} style={{ marginHorizontal: 4 }}>
          <MaterialIcons name="attach-file" size={25} color={theme.Icon} />
        </TouchableOpacity>

        <TextInput
          style={{
            flex: 1,
            fontSize: 18,
            color: theme.ModeText1,
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === "ios" ? 15 : 10,
            borderRadius: 15,
            marginRight: 5,
          }}
          placeholder="Type a message"
          placeholderTextColor={theme.ModeText3}
          value={message}
          onChangeText={setMessage}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          multiline
        />

        <TouchableOpacity
          onPress={handleSend}
          style={{
            backgroundColor: theme.SpecialBackGround,
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Ionicons name="send" size={22} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMessageField;
