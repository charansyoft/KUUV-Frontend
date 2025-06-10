import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // You can use Expo vector icons

const ProfileHeader = () => {
  return (
    <View style={{        paddingHorizontal:20,
      height: 65,backgroundColor:"#000", flexDirection: "row", alignItems: "center", }}>
      {/* Text: Notifications */}
      <TouchableOpacity style={{ paddingRight:10}}>
        <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20,  color: "#fff" }}>
        Settings
      </Text>

      {/* Right: Chevron Icon */}

    </View>
  );
};

export default ProfileHeader;
