import React from "react";
import { View, Text } from "react-native";
import NotificationsIcon from "./components/NotificationsIcon";
import StartChatIcon from "./components/StartChatIcon";
import SearchLocation from "./components/SearchLocation";

export default function HomePageHeader() {

  return (
    <View
      style={{
        height: 100,
        paddingTop: 40,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#000",
        borderBottomWidth: 0,
        borderBottomColor: "#000" || "#ccc",
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
              color: "#000",
fontFamily: "Poppins",  // if you're using Poppins
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
