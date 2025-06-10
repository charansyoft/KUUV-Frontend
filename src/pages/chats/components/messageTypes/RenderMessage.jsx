// RenderMessage.jsx
import React from "react";
import { View, Image, Text } from "react-native";

export const RenderMessage = ({ msg }) => (
  <View
    style={{
      margin: 10,
      flexDirection: msg.senderType === "user" ? "row-reverse" : "row",
      alignItems: "flex-end",
    }}
  >
    <Image
      source={
        msg.profileImage
          ? { uri: msg.profileImage }
          : require("../../../../assets/empty-circle.png")
      }
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        marginHorizontal: 6,
        borderWidth: msg.profileImage ? 0 : 1,
      }}
    />
    <View
      style={{

        borderRadius: 12,
        padding: 15,
        maxWidth: "75%",
      }}
    >
      <Text style={{ color: "#000", marginBottom: 5 }}>{msg.textMsg}</Text>
      <Text
        style={{
          color: "#000",
          fontSize: 10,
          textAlign: "right",
        }}
      >
        {new Date(msg.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  </View>
);
