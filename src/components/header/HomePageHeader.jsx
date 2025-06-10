import React from "react";
import { View, Text } from "react-native";
import NotificationsIcon from "./components/NotificationsIcon";
import StartChatIcon from "./components/StartChatIcon";
import SearchLocation from "./components/SearchLocation";
import { useAppTheme } from "../../../themeContext";
export default function HomePageHeader() {
  const { theme } = useAppTheme();
  return (
    <View
      style={{
        height: 100,
        paddingTop: 40,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: theme.BackGround,
        borderBottomWidth: 0,
        borderBottomColor: theme.LineColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchLocation />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <NotificationsIcon /> */}
          <Text
            style={{
              marginLeft: 12,
              fontSize: 20,
              fontWeight: "bold",
              color: theme.ModeText1,
              fontFamily: "Poppins", // if you're using Poppins
              letterSpacing: 1,
            }}
          >
            KUUV
          </Text>
        </View>
      </View>
    </View>
  );
}
