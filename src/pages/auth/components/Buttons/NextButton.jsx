import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function NextButton({ style = {}, disabled, ...rest }) {

  // Change the background color based on the disabled state
  const backgroundColor = disabled
    ? "#000"
    : "#b0b5ff";

  // Set icon color to white when disabled and black when enabled
  const iconColor = disabled ? "#fff" : "#000"; // White when disabled, black when enabled

  const baseStyle = {
    width: 80,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor, // Dynamic background color
    ...style, // Merge any additional styles passed in
  };

  return (
    <TouchableOpacity style={baseStyle} disabled={disabled} {...rest}>
      <Feather name="chevron-right" size={28} color={iconColor} />
    </TouchableOpacity>
  );
}
