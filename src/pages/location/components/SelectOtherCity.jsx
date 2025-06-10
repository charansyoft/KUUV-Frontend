import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "../../../../themeContext";

const SelectOtherCity = ({ locationInfo }) => {
  const navigation = useNavigation();
  console.log("SELECTOTHERLOCATION:",locationInfo.state)
  const { theme } = useAppTheme();
  const handlePress = () => {
    // Navigate to AskCity and pass locationInfo as a parameter
    navigation.navigate("AskCity", { locationInfo: locationInfo.state });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.SpecialBackGround,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 30,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 14,
          fontWeight: "500",
          marginRight: 5,
        }}
      >
        Select Other City
      </Text>
      <Feather name="chevron-right" size={20} color={"black"} />
    </TouchableOpacity>
  );
};

export default SelectOtherCity;
