import React, { useRef, useEffect } from "react";
import { Animated, Text, View, Keyboard } from "react-native";
import { useAppTheme } from "../../../../../themeContext";
import NextButton from "../Buttons/NextButton";

export default function VerifyOtpPageFooter({
  countdown,
  onResend,
  onVerify,
  isButtonEnabled,
}) {
  const footerAnim = useRef(new Animated.Value(0)).current;
  const { theme } = useAppTheme();


  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom:10,
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
            color: theme.ModeText1,
            lineHeight: 18,
          }}
        >
          Didn’t receive the code ?{"  "}
          <Text
            onPress={countdown === 0 ? onResend : null}
            style={{
              color:
                countdown === 0 ?  theme.SpecialText : theme.ModeText1,
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
