import React from "react";
import { Text, View } from "react-native";

export default function TextMessage({ message }) {
  const theme = useTheme();

  return (
    <View>
      <Text>{message?.text}</Text>
    </View>
  );
}
