import React from "react";
import { Text, View } from "react-native";

export default function DefaultHeader({ route }) {

  return (
    <View
      style={{
        backgroundColor: "#000",
        borderWidth: 1,
        borderBottomColor: "#000",
        paddingHorizontal:20,
        height: 65,
        justifyContent: "center",   // vertical center
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "300",
          color: "#000",
          fontFamily: "System", // swap this if you're using a custom font
        }}
      >
        {route?.name ?? "Page"}
      </Text>
    </View>
  );
}
