import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";

export default function Message({ item, isMe, onPress, onProfilePress }) {
  const profilePic =
    item.createdBy?.profilePic && item.createdBy.profilePic.trim() !== ""
      ? item.createdBy.profilePic
      : "https://img.favpng.com/11/8/12/logo-person-user-png-favpng-5g3QgzyddY0K7j3s9XuwB9mzv.jpg";

  const ProfileImage = !isMe && (
    <TouchableOpacity onPress={onProfilePress}>
      <Image
        source={{ uri: profilePic }}
        style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
      />
    </TouchableOpacity>
  );

  const formattedTime = new Date(item.updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 6,
        justifyContent: isMe ? "flex-end" : "flex-start",
      }}
    >
      {!isMe && ProfileImage}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          maxWidth: "75%",
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 12,
          backgroundColor: isMe ? "#B0B5FF" : "#e0e0e0",
          alignSelf: isMe ? "flex-end" : "flex-start",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 16, color: "#000" }}>{item.Message}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 10, color: "#666" }}>{formattedTime}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
