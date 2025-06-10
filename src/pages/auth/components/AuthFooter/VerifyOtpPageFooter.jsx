import React, { useRef, useEffect } from "react";
import { Animated, Text, View, Keyboard } from "react-native";

import NextButton from "../Buttons/NextButton";

export default function VerifyOtpPageFooter({
  countdown,
  onResend,
  onVerify,
  isButtonEnabled,
}) {
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(footerAnim, {
        toValue: -e.endCoordinates.height + 20,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(footerAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 75,
        left: 20,
        right: 20,
        transform: [{ translateY: footerAnim }],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: "#000",
            lineHeight: 18,
          }}
        >
          Didn’t receive the code ?{"  "}
          <Text
            onPress={countdown === 0 ? onResend : null}
            style={{
              color:
                countdown === 0 ? "#000" : "#000",
              fontWeight: countdown === 0 ? "500" : "normal",
            }}
          >
            {countdown === 0 ? "Tap to resend" : `Resend in ${countdown}s`}
          </Text>
        </Text>

        <NextButton disabled={!isButtonEnabled} onPress={onVerify} />
      </View>
    </Animated.View>
  );
}
