import React, { useState, useRef } from "react";
import { Image, Animated, Vibration } from "react-native";
import { Button } from "react-native-paper";
import { useAppTheme } from "../../../../../themeContext";
export default function LoginWithAppleButton() {
  const [clicked, setClicked] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
const { theme } = useAppTheme();
  const handlePress = () => {
    if (clicked) return;

    setClicked(true);

    // Short, sharp vibration (like an error buzz)
    Vibration.vibrate(50);

    // Shake animation sequence
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
        style={{
          paddingVertical: 5,
          width: "100%",
          borderColor: clicked ? "rgb(255,77,79)" : theme.LineColor, // red or light gray
          borderWidth,
          borderRadius,
          backgroundColor: theme.BackGround, // optional: black background for contrast
        }}
        textColor={clicked ? "rgb(255,77,79)" : theme.ModeText1} // red or white text
        labelStyle={{
          fontSize: 15,
        }}
        icon={() =>
          clicked ? null : (
            <Image
              source={require("../../../../assets/apple.png")}
              style={{ width: 30, height: 30 }}
            />
          )
        }
        onPress={handlePress}
      >
        {clicked ? "Under Development" : "Login with Apple"}
      </Button>
    </Animated.View>
  );
}
