// pages/auth/AuthLoadingScreen.js
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "home-stack" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "auth-login-methods" }],
        });
      }
    }

    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#999" />
    </View>
  );
}
