import React from "react";
import { View, Text, TouchableOpacity, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
        paddingHorizontal: 20,
        height: 110,
        
        backgroundColor: "#000",
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
            color={"#000"}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "#000" }}>My Information</Text>
      </View>

      {/* Right: Settings Icon */}
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <MaterialCommunityIcons
          name="cog-outline"
          size={26}
          color={"#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
