import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // Changed
import CustomHeader from "../components/header/CustomHeader";
import ProfileStack from "./ProfileStack";
import ChatsStack from "./ChatStack";
import GroupsStack from "./GroupsStack";
import ShoutsPage from "../pages/shouts/ShoutsPage";
import ShoutsStack from "./ShoutsStack";
import { useAppTheme } from "../../themeContext";
const Tab = createMaterialTopTabNavigator(); // Changed
import { useSelector } from "react-redux"; // ✅ for accessing phone
import { useEffect } from "react";
import socket from "../socket";


export default function HomeStack() {
    const phone = useSelector((state) => state.user.phone); // ✅ get user's phone
  
  const { theme } = useAppTheme();
  useEffect(() => {
    if (socket && phone) {
      socket.emit("registerUser", phone); // ⬅️ Register on socket connect
    }
  }, [phone]);
  return (
    <Tab.Navigator
      initialRouteName="home"
      sceneAnimationEnabled={false}
      tabBarPosition="bottom" // place tab bar at bottom with swipe enabled
      screenOptions={({ route }) => ({
        header: () => <CustomHeader route={route} />,
        swipeEnabled: false, // enable swipe gestures
        tabBarShowLabel: true,
        animationEnabled: false,
        tabBarPressColor: "transparent", // 🚫 Removes ripple effect on press
        tabBarPressOpacity: 1, // ✅ Makes press feel instant

        tabBarStyle: {
          backgroundColor: theme.BackGround,
          borderTopWidth: 0.2,
          paddingVertical: 2,
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
              color={focused ? theme.SpecialBackGround : theme.Icon}
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: 13,
              color: focused ? theme.SpecialBackGround : theme.ModeText1,
              fontFamily: "System",
              marginBottom: 0,
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
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? "ChatsListPage";
          const hideTabScreens = [
            "PersonalChat",
            "GroupChat",
            "PostComposer",
            "ViewProfile",
          ];

          const shouldHideTabBar = hideTabScreens.includes(routeName);

          return {
            tabBarStyle: {
              display: shouldHideTabBar ? "none" : "flex",
              backgroundColor: theme.BackGround,
              borderTopWidth: 0.2,
              paddingTop: 5,
              borderTopColor: theme.LineColor,
              
            },
          };
        }}
      />

      <Tab.Screen name="profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
