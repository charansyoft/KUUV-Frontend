import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function SearchField({
  value = '',
  onChangeText,
  placeholder,
  style = {},
  containerStyle = {},
  ...rest
}) {

  return (
    <View style={[styles.container("#000"), containerStyle]}>
      <Feather
        name="search"
        size={20}
        color="#000"
        style={styles.icon}
      />
      <TextInput
        style={[styles.textField("#000"), style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#000" || "#aaa"}
        {...rest}
      />
    </View>
  );
}

const styles = {
  container: () => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 15,
  }),
  icon: {
    marginRight: 8,
    opacity: 0.5,
  },
  textField: () => ({
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0, // avoid overflow in Android
  }),
};
