import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { addAddress } from "../../../redux/UserSelectedAddress";
import { useAppTheme } from "../../../../themeContext";
import BASE_URL from "../../../../config";

export default function ContinueFooter({
  joinedCount,
  joinedGroups,
  state,
  city,
  previouslyJoinedGroupIds = [],
  phone,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useAppTheme();
  const phoneNumber = phone || useSelector((state) => state.user.phone);

  const handleContinue = async () => {
    if (joinedCount === 0 && previouslyJoinedGroupIds.length === 0) {
      return;
    }

    const newGroups = joinedGroups.filter(
      (id) => !previouslyJoinedGroupIds.includes(id)
    );

    if (newGroups.length === 0 && previouslyJoinedGroupIds.length > 0) {
      dispatch(addAddress({ stateName: state, city }));
      navigation.reset({
        index: 0,
        routes: [{ name: "home-stack", params: { screen: "home" } }],
      });
      return;
    }

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

  const isDisabled = joinedCount === 0 && previouslyJoinedGroupIds.length === 0;

  const newGroups = joinedGroups.filter(
    (id) => !previouslyJoinedGroupIds.includes(id)
  );

  const buttonText = !isDisabled
    ? newGroups.length > 0
      ? `Continue with ${joinedCount} group${joinedCount > 1 ? "s" : ""}`
      : "Continue"
    : "Continue";

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
          color: "#000",
          fontSize: 16,
          fontWeight: "600",
          marginRight: 6,
        }}
      >
        {buttonText}
      </Text>
      <Feather name="chevron-right" size={22} color="#000" />
    </TouchableOpacity>
  );
}
