import React, { useRef } from "react";
import { View } from "react-native";
import TextField from "../../../../components/forms/TextField";
import { useAppTheme } from "../../../../../themeContext";
export default function OtpVerification({ otpArray, setOtpArray }) {
  const inputRefs = useRef([]);
  const { theme } = useAppTheme();
  const handleChangeText = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);

    if (value && index < otpArray.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12, // space between fields
        marginTop: 0,
        alignSelf: "center",
      }}
    >
      {otpArray.map((digit, index) => (
        <TextField
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
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
            color: theme.ModeText2,
          }}
          maxLength={1}
          keyboardType="numeric"
          value={digit}
          onChangeText={(value) => handleChangeText(value, index)}
          onKeyPress={(e) => handleBackspace(e, index)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}
