import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../../../themeContext";

export default function ShoutsHeader() {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        paddingVertical:20,
        backgroundColor: theme.BackGround,
        justifyContent: "center",     // vertical center
        alignItems: "center",         // horizontal center
      }}
    >
      <Text
        style={{
          color: theme.ModeText1,
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Poppins",
          textAlign: "center", 
          }}
      >
        Shouts
      </Text>
    </View>
  );
}
