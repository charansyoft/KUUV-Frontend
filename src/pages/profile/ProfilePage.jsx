import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useAppTheme } from "../../../themeContext";
export default function ProfilePage() {
  const navigation = useNavigation();
  const{ theme, changeTheme } = useAppTheme();
  const phone = useSelector((state) => state.user.phone);

  // Navigation handlers (removed functionalities)
  const handleEditProfile = () =>
    navigation.navigate("profile-my-information", { userData: phone });

  const handleLogout = async () => {
    // Clear authToken from AsyncStorage
    await AsyncStorage.removeItem("authToken");

    // Optionally, clear all other data if needed
    await AsyncStorage.clear();  // If you want to clear all the stored data

    // Reset navigation to go back to login method screen
    navigation.reset({
      index: 0,
      routes: [{ name: "auth-login-methods" }],
    });
  };

  const handleBookings = () => {}; // Removed functionality
  const handleMyBusiness = () => {}; // Removed functionality
  const handleMyCredits = () => {}; // Removed functionality
  const handleAskQuestions = () => {}; // Removed functionality
  const handleHelp = () => {}; // Removed functionality

// inside your ProfilePage component

const handleTheme = () => {
  Alert.alert(
    "Select Theme",
    "Choose your preferred theme",
    [
      { text: "Light", onPress: () => changeTheme("light") },
      { text: "Dark", onPress: () => changeTheme("dark") },
      { text: "Default", onPress: () => changeTheme("dark") }, // or use system later
      { text: "Cancel", style: "cancel" },
    ],
    { cancelable: true }
  );
};

  // Divider with spacing
  const renderDivider = () => (
    <View
      style={{
        height: 1,
        backgroundColor: "#000",
        opacity: 0.15,
        marginVertical: 20, // equal spacing top and bottom
      }}
    />
  );

  // Reusable option row
  const renderOption = (icon, label, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather name={icon} size={22} style={{ color: "#000" }} />
        <Text
          style={{
            fontSize: 17,
            color: "#000",
            fontFamily: "System",
            marginLeft: 15,
          }}
        >
          {label}
        </Text>
      </View>
      <Feather name="chevron-right" size={22} color={"#000"} />
    </TouchableOpacity>
  );

  // Render list with top divider except first item
  const renderOptionsList = (options) =>
    options.map((option, index) => (
      <View key={index}>
        {index !== 0 && renderDivider()}
        {renderOption(option.icon, option.label, option.onPress)}
      </View>
    ));

  // Option data for the available actions
  const mainOptions = [
    { icon: "user", label: "My Information", onPress: handleEditProfile },
    { icon: "calendar", label: "Bookings", onPress: handleBookings },
    { icon: "briefcase", label: "My Business", onPress: handleMyBusiness },
    { icon: "sun", label: "Theme", onPress: handleTheme },
    { icon: "credit-card", label: "My Credits", onPress: handleMyCredits },
  ];

  const supportOptions = [
    {
      icon: "message-circle",
      label: "Ask Questions",
      onPress: handleAskQuestions,
    },
    { icon: "help-circle", label: "Help", onPress: handleHelp },
  ];

  const logoutOption = [
    { icon: "log-out", label: "Logout", onPress: handleLogout },
  ];

  return (
    <View
      style={{ backgroundColor: "#000", flex: 1 }}
    >
      <ScrollView contentContainerStyle={{}}>
        {/* Main Actions */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 15,
            marginHorizontal: 15,
            borderRadius: 14,
            marginTop: 10,
          }}
        >
          {renderOptionsList(mainOptions)}
        </View>

        {/* Support */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 15,
            marginHorizontal: 15,
            marginVertical: 14,
          }}
        >
          {renderOptionsList(supportOptions)}
        </View>

        {/* Logout */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 14,
            padding: 15,
            marginHorizontal: 15,
            marginBottom: 15,
          }}
        >
          {renderOptionsList(logoutOption)}
        </View>
      </ScrollView>
    </View>
  );
}
