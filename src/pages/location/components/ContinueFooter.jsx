import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { addAddress } from "../../../redux/UserSelectedAddress"; // Adjust import if needed
import { useAppTheme } from "../../../../themeContext";
import BASE_URL from "../../../../config"
export default function ContinueFooter({
  joinedCount,
  joinedGroups,
  state,
  city,
  previouslyJoinedGroupIds = [], // renamed to match your prop name
  phone,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useAppTheme();
  const phoneNumber = phone || useSelector((state) => state.user.phone);

  const handleContinue = async () => {
    // If user has no current joins AND no previously joined groups, do nothing
    if (joinedCount === 0 && previouslyJoinedGroupIds.length === 0) {
      return;
    }

    // Find groups newly joined this time (not previously joined)
    const newGroups = joinedGroups.filter(
      (id) => !previouslyJoinedGroupIds.includes(id)
    );

if (newGroups.length === 0 && previouslyJoinedGroupIds.length > 0) {
  // No new groups joined but user had previously joined groups
  dispatch(addAddress({ stateName: state, city }));

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "home-stack",
        params: { screen: "home" }, // optional if you want to land directly in "home"
      },
    ],
  });

  return;
}


    // Else, update backend with new joined groups
    try {
      const data = {
        phone: phoneNumber,
        joinedGroups,
      };

      const response = await axios.post(
        `${BASE_URL}/api/groups/joinedGroupsByPhone`,
        data
      );

      if (response.data.status === "success") {
        dispatch(addAddress({ stateName: state, city }));
        navigation.navigate("home-stack", { screen: "home" });
      } else {
        console.error("API responded with failure:", response.data);
      }
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Disable button only if no current joins AND no previously joined groups
  const isDisabled = joinedCount === 0 && previouslyJoinedGroupIds.length === 0;

  return (
    <TouchableOpacity
      style={{
backgroundColor: !isDisabled ? "#B0B5FF" : "#aaa",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 14,
        borderRadius: 40,
        marginBottom: 0,
      }}
      onPress={handleContinue}
      disabled={isDisabled}
    >
      <Text
        style={{
          color: !isDisabled ? "#000" : "#000",
          fontSize: 16,
          fontWeight: "600",
          marginRight: 6,
        }}
      >
        {!isDisabled
          ? joinedCount > 0
            ? `Continue with ${joinedCount} group${joinedCount > 1 ? "s" : ""}`
            : `Continue`
          : "Continue"}
      </Text>
      <Feather
        name="chevron-right"
        size={22}
        color={!isDisabled ? "#000" : "#000"}
      />
    </TouchableOpacity>
  );
}

