import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../../../../themeContext";
import NextButton from "../Buttons/NextButton";

export default function VerifyOtpPageFooter({
  countdown,
  onResend,
  onVerify,
  isButtonEnabled,
}) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        Didn’t receive the code?{" "}
        <Text
          onPress={countdown === 0 ? onResend : null}
          style={{
            color: countdown === 0 ? theme.SpecialText : theme.ModeText1,
            fontWeight: countdown === 0 ? "500" : "normal",
          }}
        >
          {countdown === 0 ? "Tap to resend" : `Resend in ${countdown}s`}
        </Text>
      </Text>

      <NextButton disabled={!isButtonEnabled} onPress={onVerify} />
    </View>
  );
}
