import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // You can use Expo vector icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useAppTheme } from "../../../../themeContext";
const ProfileHeader = () => {
  const { theme }= useAppTheme();
  const navigation = useNavigation(); // Access navigation object
  return (
    <View
      style={{
        paddingHorizontal: 20,
        height: 100,
        paddingTop:30,
        backgroundColor: theme.BackGround,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Text: Notifications */}
      <TouchableOpacity style={{ paddingRight: 10 }}
              onPress={() => navigation.goBack()} // Go back to the previous screen
>
        <MaterialCommunityIcons name="chevron-left" size={30} color={theme.Icon} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, color: theme.ModeText1 }}>Settings</Text>

      {/* Right: Chevron Icon */}
    </View>
  );
};

export default ProfileHeader;
