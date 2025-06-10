import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SendMessageField = ({ PersonalChatId, GroupChatId }) => {
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const type = "msg";

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
      sendMessage(`http://192.168.29.75:3000/groups/${GroupChatId}/messages`);
    } else if (PersonalChatId) {
      sendMessage(`http://192.168.29.75:3000/chats/${PersonalChatId}/messages`);
    } else {
      console.warn("No chat ID provided");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <TouchableOpacity onPress={handleEmojiPress} style={styles.icon}>
          <Ionicons name="happy-outline" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFilePress} style={styles.icon}>
          <MaterialIcons name="attach-file" size={25} color="#fff" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          multiline
        />

        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 10,
    // Remove absolute positioning
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
  },
  icon: {
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: Platform.OS === "ios" ? 15 : 10,
    borderRadius: 15,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: "#B0B5FF",
    borderRadius: 20,
    padding: 10,
  },
});

export default SendMessageField;
