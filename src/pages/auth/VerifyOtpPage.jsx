import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Keyboard,
  View,
  Text,
  Animated,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useVerifyOtpMutation from "../../api/useVerifyOtpMutation";
import useLoginMutation from "../../api/useLoginMutation";
import { setUser } from "../../redux/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "./components/Buttons/BackButton";
import NextButton from "./components/Buttons/NextButton";
import OtpVerification from "./components/InputVerification/OtpVerification";
import VerifyOtpPageFooter from "./components/AuthFooter/VerifyOtpPageFooter";
import { useAppTheme } from "../../../themeContext";
export default function VerifyOtpPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber, ccode } = route.params;
  const { width } = Dimensions.get("window");
  const { theme } = useAppTheme();
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
const [keyboardOffset, setKeyboardOffset] = useState(0);

  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(footerAnim, {
        toValue: -e.endCoordinates.height,
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

  // Countdown timer for resend OTP (30s)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const verifyOtpMutation = useVerifyOtpMutation({
    onSuccess: async (data) => {
      const token = data?.data?.token;
      const phone = data?.data?.user?.phone;

      dispatch(setUser(phone));
      if (token) {
        try {
          await AsyncStorage.setItem("authToken", token);
          navigation.navigate("AskLocation");
        } catch (error) {
          console.error("Error storing token:", error);
        }
      }
    },
    onError: (error) => console.error("OTP verification failed:", error),
  });

  const resendOtpMutation = useLoginMutation({
    onSuccess: () => {
      console.log("OTP re-sent successfully");
      setCountdown(30);
      setOtpValue(["", "", "", ""]);
    },
    onError: (error) => {
      console.error("Failed to resend OTP:", error);
    },
  });

  // Check if all 4 digits are filled
  const isOtpComplete = otpValue.every((digit) => digit !== "");

  const isButtonEnabled = isOtpComplete && countdown > 0;

  const handleVerifyOtp = () => {
    if (isButtonEnabled) {
      verifyOtpMutation.mutate({
        otp: otpValue.join(""),
        phone: phoneNumber,
      });
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      resendOtpMutation.mutate({ phone: phoneNumber, ccode });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.BackGround }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, padding: 20 }}>
          <BackButton />

          <View
            style={{
              marginTop: "10%",
              marginBottom: "10%",
              marginLeft: "2%",
              maxWidth: 280,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: width * 0.07,
                fontWeight: "500",
                color: theme.ModeText1,
              }}
            >
              Verify Your Mobile Number
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                color: theme.ModeText3,
                marginTop: 10,
              }}
            >
              Enter the code we’ve sent by text to{" "}
              <Text
                style={{ fontWeight: "600", color: theme.SpecialText }}
              >
                {ccode} {phoneNumber}
              </Text>
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <OtpVerification otpArray={otpValue} setOtpArray={setOtpValue} />
          </View>

<Animated.View
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  }}
>
  <VerifyOtpPageFooter
    countdown={countdown}
    onResend={handleResendOtp}
    onVerify={handleVerifyOtp}
    isButtonEnabled={isButtonEnabled}
  />
</Animated.View>

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
