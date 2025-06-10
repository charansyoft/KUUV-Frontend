import React from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Import TouchableOpacity
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useAppTheme } from "../../../../themeContext";
const EditProfileHeader = () => {
  const navigation = useNavigation(); // Access navigation object
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        height: 100,
        paddingTop:35,
        backgroundColor: theme.BackGround,
        flexDirection: "row",
        alignItems: "center", // Vertically center everything properly
      }}
    >
      {/* TouchableOpacity to handle onPress event */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={30} color={theme.Icon} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 22,
          color:theme.ModeText1,
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
