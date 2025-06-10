import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/modalsSlice";

export default function AddPost() {
  const dispatch = useDispatch();

  function handlePress() {
    dispatch(openModal({ modalName: "AddPostModel" }));
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "300",
          color: "#000",
          fontFamily: "System",
        }}
      >
        Shouts
      </Text>

      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            backgroundColor: "#000",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather name="plus" size={24} color="#000000" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
