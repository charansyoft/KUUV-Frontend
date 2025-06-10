import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/modalsSlice";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useAppTheme } from "../../../../themeContext";
export default function SearchLocation() {
  const { theme } = useAppTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  console.log("Selected Location :", selectedLocation);
  const handlePress = () => {
    const stateName = selectedLocation.state;
    if (stateName) {
      navigation.navigate("AskCity", { locationInfo: stateName });
    } else {
      // fallback if not available
      console.warn("No state found in selectedLocation");
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: theme.ModeText3,
        padding: 5,
        borderRadius: 50,
        width: 180,
      }}
      onPress={handlePress}
    >
      <Ionicons name="location-outline" size={24} color={theme.Icon} />
      <Text
        style={{
          color: theme.ModeText1,
          marginLeft: 6,
          fontSize: 18,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {selectedLocation.state || selectedLocation.state || "Not set"}
      </Text>
    </TouchableOpacity>
  );
}
