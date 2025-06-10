import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // Changed
import CustomHeader from "../components/header/CustomHeader";
import ProfileStack from "./ProfileStack";
import ChatsStack from "./ChatStack";
import GroupsStack from "./GroupsStack";
import ShoutsPage from "../pages/shouts/ShoutsPage";
import ShoutsStack from "./ShoutsStack";
import { useAppTheme } from "../../themeContext";
const Tab = createMaterialTopTabNavigator(); // Changed

export default function HomeStack() {
const { theme } = useAppTheme();
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarPosition="bottom" // place tab bar at bottom with swipe enabled
      screenOptions={({ route }) => ({
        header: () => <CustomHeader route={route} />,
        swipeEnabled: true, // enable swipe gestures
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: theme.BackGround,
          height: 110,
          borderTopWidth: 0.2,
          paddingTop: 5,
          borderTopColor: theme.LineColor,
          elevation: 5, // for shadow on Android
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.LineColor,
          height: 0,
          marginBottom: 2,
          borderRadius: 50,
          width: 34,
          marginLeft: (() => {
            // To center indicator under icon/text
            switch (route.name) {
              case "home":
                return "10%";
              case "shouts":
                return "10%";
              case "chats":
                return "10%";
              case "profile":
                return "10%";
              default:
                return 0;
            }
          })(),
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "home":
              iconName = "home-outline";
              break;
            case "shouts":
              iconName = "bullhorn-outline";
              break;
            case "chats":
              iconName = "message-outline";
              break;
            case "profile":
              iconName = "account-outline";
              break;
          }

          return (
            <Icon
              name={iconName}
              size={25}
              color={
                focused ? theme.SpecialBackGround : theme.Icon
              }
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: 13,
              color: focused
                ? theme.SpecialBackGround
                : theme.ModeText1,
              fontFamily: "System",
              marginBottom:0,
            }}
          >
            {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="home" component={GroupsStack} />
      <Tab.Screen name="shouts" component={ShoutsStack} />
      <Tab.Screen
        name="chats"
        component={ChatsStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("chats", {
              screen: "ChatsListPage",
            });
          },
        })}
      />
      <Tab.Screen name="profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
