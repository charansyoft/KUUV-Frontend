import React from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Import TouchableOpacity
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const EditProfileHeader = () => {
  const navigation = useNavigation(); // Access navigation object

  return (
    <View
      style={{
        paddingHorizontal: 20,
        height: 60,
        paddingTop:35,
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center", // Vertically center everything properly
      }}
    >
      {/* TouchableOpacity to handle onPress event */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={30} color={"#000"} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 22,
          color:"#000",
          fontWeight: "bold",
          marginLeft: 30, // Space between icon and text
        }}
      >
        Edit Profile
      </Text>
    </View>
  );
};

export default EditProfileHeader;
