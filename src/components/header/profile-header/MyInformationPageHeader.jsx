import React from "react";
import { View, Text, TouchableOpacity, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../../../themeContext";
const ProfileHeader = () => {
  const navigation = useNavigation();
  const {theme} = useAppTheme();
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: theme.BackGround,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Back Button and Title */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={theme.Icon}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: theme.ModeText1 }}>My Information</Text>
      </View>

      {/* Right: Settings Icon */}
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <MaterialCommunityIcons
          name="cog-outline"
          size={26}
          color={theme.Icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
