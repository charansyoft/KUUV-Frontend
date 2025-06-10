import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginWithAppleButton from "./components/LoginMethods/LoginWithAppleButton";
import LoginWithGoogleButton from "./components/LoginMethods/LoginWithGoogleButton";
import LoginWithPhoneNumberButton from "./components/LoginMethods/LoginWithPhoneNumberButton";
import { useAppTheme } from "../../../themeContext";

export default function LoginMethodsPage({ navigation }) {
  const { height } = Dimensions.get("window");
const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: height * 0.25,
        backgroundColor: theme.BackGround, // inline background black
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          variant="headlineMedium"
          style={{
            textAlign: "center",
            color: theme.ModeText1, // inline white text
            fontSize: 28,
            fontWeight: "600",
          }}
        >
          Let’s find new groups around you with privacy{" "}
          <MaterialCommunityIcons name="lock-outline" size={24} color={theme.Icon} />
        </Text>

        <LoginWithPhoneNumberButton />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: height * 0.04,
            width: "70%",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: theme.ModeText1 }} />
          <Text
            variant="bodyMedium"
            style={{
              color: theme.ModeText1,
              marginHorizontal: 10,
              fontSize: 14,
            }}
          >
            or
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.ModeText1 }} />
        </View>

        <View
          style={{
            alignItems: "center",
            rowGap: 12,
            width: "100%",
          }}
        >
          <LoginWithGoogleButton />
          <LoginWithAppleButton />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text variant="bodyMedium" style={{ color: theme.ModeText3 }}>
          Don't have an account?
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            fontWeight: "600",
            color: theme.ModeText1,
            marginLeft: 5,
          }}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
}
