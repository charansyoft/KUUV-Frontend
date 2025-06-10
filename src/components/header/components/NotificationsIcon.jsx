import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/modalsSlice";
import { useNavigation } from "@react-navigation/native";  // Import useNavigation

export default function NotificationsIcon() {
  const navigation = useNavigation();  // Initialize navigation

  // const dispatch = useDispatch();

  // const handlePress = () => {
  //   dispatch(openModal({ modalName: "notificationsModal" }));
  // };

  const handlePress = () => {
    navigation.navigate("home-stack", {
      screen: "shouts",  // Specify the tab/screen you want to navigate to
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}  // Handle press to navigate
      style={{
        padding: 8,
        marginTop: 8,
        position: "relative",
      }}
    >
      <Feather name="bell" size={26} color={"#000"} />
      <View
        style={{
          position: "absolute",
          top: -2,
          right: 2,
          backgroundColor:"#000",
          borderRadius: 10,
          width: 20,
          height: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          2
        </Text>
      </View>
    </TouchableOpacity>
  );
}
