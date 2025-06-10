import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "../../../themeContext";

export default function SearchField({
  value = '',
  onChangeText,
  placeholder,
  style = {},
  containerStyle = {},
  ...rest
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.BackGround,
        paddingHorizontal: 10,
        height: 45,
        borderRadius: 15,
        ...containerStyle,
      }}
    >
      <Feather
        name="search"
        size={20}
        color={theme.Icon}
        style={{ marginRight: 8, opacity: 0.5 }}
      />
      <TextInput
        style={{
          flex: 1,
          fontSize: 16,
          color: theme.ModeText1,
          paddingVertical: 0,
          ...style,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.ModeText3}
        {...rest}
      />
    </View>
  );
}
