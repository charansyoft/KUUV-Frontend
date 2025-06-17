import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";
import TextField from "../../../../components/forms/TextField";
import { useAppTheme } from "../../../../../themeContext";

export default function OtpVerification({ otpArray, setOtpArray }) {
  const inputRefs = useRef([]);
  const { theme } = useAppTheme();

  // 📋 Auto-fill from clipboard
  useEffect(() => {
    const checkClipboardForOtp = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        const clipboardText = await Clipboard.getStringAsync();
        console.log("📋 Clipboard:", clipboardText);

        if (/^\d{4}$/.test(clipboardText)) {
          setOtpArray(clipboardText.split(""));
          inputRefs.current[3]?.blur(); // Blur last input
        }
      } catch (e) {
        console.warn("Clipboard check failed:", e);
      }
    };

    checkClipboardForOtp();
  }, []);

  // ⌨️ On input
  const handleChangeText = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otpArray];
    updatedOtp[index] = value;
    setOtpArray(updatedOtp);

    if (value && index < otpArray.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === otpArray.length - 1) {
      inputRefs.current[index]?.blur();
    }
  };

  // ⬅️ On backspace
  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      const updatedOtp = [...otpArray];

      if (!otpArray[index] && index > 0) {
        updatedOtp[index - 1] = "";
        setOtpArray(updatedOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otpArray[index]) {
        updatedOtp[index] = "";
        setOtpArray(updatedOtp);
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginTop: 0,
        alignSelf: "center",
      }}
    >
      {otpArray.map((digit, index) => (
        <TextField
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={digit}
          onChangeText={(value) => handleChangeText(value, index)}
          onKeyPress={(e) => handleBackspace(e, index)}
          maxLength={1}
          autoFocus={index === 0}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          importantForAutofill="yes"
          autoComplete="sms-otp"
          cursorColor={theme.LineColor} // Or theme.LineColor
          style={{
            width: 80,
            height: 60,
            borderRadius: 50,
            borderWidth: 1.2,
            borderColor: theme.LineColor,
            backgroundColor: theme.ModeText3,
            textAlign: "center",
            fontSize: 22,
            fontWeight: "500",
            color: theme.ModeText1,
          }}
        />
      ))}
    </View>
  );
}
