import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import LoginMethodsPage from "../pages/auth/LoginMethodsPage";
import LoginWithPhoneNumberPage from "../pages/auth/LoginWithPhoneNumberPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
// import GroupDetailsPage from "../pages/groups/GroupDetailsPage";
import HomeStack from "./HomeStack";
import GroupSelection from "../pages/location/GroupSelection";
import AskLocation from "../pages/location/AskLocation";
import AskCity from "../pages/location/AskCity";

const Stack = createStackNavigator();

const linking = {
  prefixes: ["https://yourapp.com", "http://localhost:8081", "yourapp://"],
  config: {
    screens: {
      "auth-login-methods": "",
      "auth-phone-number": "login/phone",
      "auth-verify-otp": "login/verify-otp",
      AskLocation: "AskLocation",
      AskCity: "AskCity",
      GroupSelection: "GroupSelection",
      "home-stack": {
        screens: {
          home: {
            screens: {
              HomeGroupsList: "HomeGroupsList",
              GroupDetailsPage: "GroupDetailsPage",
            },
          },
          shouts: "shouts",
          chats: {
            screens: {
              GroupChat: "GroupChat",
              ChatPage: "ChatPage",
              ChatsListPage: "ChatsListPage",
            },
          },
          profile: {
            screens: {
              profile: "profile",
              "profile-my-information": "my-information",
              "profile-edit": "edit-profile",
            },
          },
        },
      },
      "group-details": "groups/:id",
    },
  },
};

export default function RootStack() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => {
          // Only add custom animation for these three auth screens
          const authScreens = [
            "auth-login-methods",
            "auth-phone-number",
            "auth-verify-otp",
            "AskLocation",
            "AskCity",
            "GroupSelection",
            "home-stack",
          ];

          if (authScreens.includes(route.name)) {
            return {
              headerShown: false,
              gestureEnabled: true,
              // Customize open and close animations
              transitionSpec: {
                open: {
                  animation: "timing",
                  config: { duration: 300 }, // open animation duration (ms)
                },
                close: {
                  animation: "timing",
                  config: { duration: 300 }, // close animation duration (ms)
                },
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            };
          } else {
            // default for other screens: no header, no animation (or customize if needed)
            return {
              headerShown: false,
              animationEnabled: false,
            };
          }
        }}
      >
        <Stack.Screen name="auth-login-methods" component={LoginMethodsPage} />
        <Stack.Screen
          name="auth-phone-number"
          component={LoginWithPhoneNumberPage}
        />
        <Stack.Screen name="auth-verify-otp" component={VerifyOtpPage} />
        <Stack.Screen name="AskLocation" component={AskLocation} />
        <Stack.Screen name="AskCity" component={AskCity} />
<Stack.Screen
  name="GroupSelection"
  component={GroupSelection}
  options={{
    gestureEnabled: false, // 🔒 disables swipe-back
    headerShown: false,
    animationEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }}
/>
        <Stack.Screen name="home-stack" component={HomeStack} />
        {/* <Stack.Screen name="group-details" component={GroupDetailsPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
