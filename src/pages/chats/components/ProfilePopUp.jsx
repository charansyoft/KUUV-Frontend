import React from "react";
import { Modal, TouchableOpacity, View, Alert } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import useCreateChatMutation from "../../../api/chats/personalChats/useCreateChatMutation";
import { useAppTheme } from "../../../../themeContext";
export default function ProfilePopup({ visible, onClose, userId }) {
  const navigation = useNavigation();
  const createChatMutation = useCreateChatMutation();
  const { theme } = useAppTheme();
  const handleViewProfile = () => {
    onClose(); // Close modal
    navigation.navigate("ViewProfile", { userId }); // Navigate to profile screen
  };

  const handleStartChat = () => {
    createChatMutation.mutate(
      { opponentId: userId },
      {
        onSuccess: (data) => {
          console.log("✅ Chat created:", data);
          onClose();

          // Navigate to ChatsListPage and auto-open chat
          navigation.navigate("ChatsListPage", {
            targetUserId: userId,
          });
        },
        onError: (error) => {
          console.error("❌ Chat creation failed:", error);
          Alert.alert("Error", error?.response?.data?.message || "Chat failed");
        },
      }
    );
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={{
            width: 320,
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
            paddingTop: 40,
            elevation: 8,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            position: "relative",
          }}
        >
          {/* Close Icon */}
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
            }}
          >
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>

          {/* Button Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {/* Start Chat Button */}
            <TouchableOpacity
              onPress={handleStartChat}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                marginRight: 6,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#F0F4FF",
              }}
            >
              <Icon
                name="chat"
                size={22}
                color="#4B61D1"
                style={{ marginRight: 6 }}
              />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "600" }}>
                Say Hello
              </Text>
            </TouchableOpacity>

            {/* View Profile Button */}
            <TouchableOpacity
              onPress={handleViewProfile}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                marginLeft: 6,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#F0F4FF",
              }}
            >
              <Icon
                name="person"
                size={22}
                color="#4B61D1"
                style={{ marginRight: 6 }}
              />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "600" }}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
