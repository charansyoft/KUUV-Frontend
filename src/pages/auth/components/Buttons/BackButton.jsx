import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Use this hook to get navigation
import { useAppTheme } from "../../../../../themeContext";
export default function BackButton({ style }) {
  const navigation = useNavigation(); // Access navigation here
const { theme}= useAppTheme();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()} // This will handle the go-back functionality
      style={[{ width: 35, height: 35, opacity: 0.6 }, style]} // Merge passed styles
    >
      <Feather name="chevron-left" size={30} color={theme.Icon} />
    </TouchableOpacity>
  );
}
