import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // You can use Expo vector icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ProfileHeader = () => {
  const navigation = useNavigation(); // Access navigation object
  return (
    <View
      style={{
        paddingHorizontal: 20,
        height: 70,
        paddingTop:30,
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Text: Notifications */}
      <TouchableOpacity style={{ paddingRight: 10 }}
              onPress={() => navigation.goBack()} // Go back to the previous screen
>
        <MaterialCommunityIcons name="chevron-left" size={30} color={"#000"} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: "#000" }}>Settings</Text>

      {/* Right: Chevron Icon */}
    </View>
  );
};

export default ProfileHeader;
