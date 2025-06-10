import React, { useState, useRef } from "react";
import { Animated, Vibration } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons"; // Apple logo here
import { useAppTheme } from "../../../../../themeContext";

export default function LoginWithAppleButton() {
  const [clicked, setClicked] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useAppTheme();

  const handlePress = () => {
    if (clicked) return;

    setClicked(true);
    Vibration.vibrate(50);

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 30, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 30, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 30, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        setClicked(false);
      }, 2000);
    });
  };

  const borderRadius = 20;
  const borderWidth = 1;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shakeAnim }],
        width: "90%",
        alignSelf: "center",
      }}
    >
      <Button
        mode="outlined"
        onPress={handlePress}
        style={{
          paddingVertical: 5,
          width: "100%",
          borderColor: clicked ? "rgb(255,77,79)" : theme.LineColor,
          borderWidth,
          borderRadius,
          backgroundColor: theme.BackGround,
        }}
        textColor={clicked ? "rgb(255,77,79)" : theme.ModeText1}
        labelStyle={{
          fontSize: 15,
        }}
        icon={() =>
          clicked ? null : (
            <FontAwesome
              name="apple"
              size={26}
              color={theme.ModeText1}
              style={{ marginRight: 6 }}
            />
          )
        }
      >
        {clicked ? "Under Development" : "Login with Apple"}
      </Button>
    </Animated.View>
  );
}
