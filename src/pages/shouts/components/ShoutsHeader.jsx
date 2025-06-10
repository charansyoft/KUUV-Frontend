import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ShoutsHeader() {

  return (
    <View style={[styles.header, { backgroundColor: "#000" }]}>
      <Text style={[styles.title, { color: "#000" }]}>Shouts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
