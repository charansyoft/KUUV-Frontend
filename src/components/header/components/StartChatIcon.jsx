import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Or import web equivalents if needed

export default function StartChatIcon() {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#000",
        padding: 6,
        borderRadius: 50,
        marginLeft:50,
      }}
    >
      <MaterialIcons name="add" size={20} color="black" />
    </TouchableOpacity>
  );
}
