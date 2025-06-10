import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import useLoginMutation from "../../api/useLoginMutation";
import NextButton from "./components/Buttons/NextButton";
import BackButton from "./components/Buttons/BackButton";
import NumberVerification from "./components/InputVerification/NumberVerification";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../../../themeContext"
const { width, height } = Dimensions.get("window");

export default function LoginWithPhoneNumberPage() {
  const {theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    dial: "+91",
    name: "India",
    length: 10,
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const navigation = useNavigation();

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      navigation.navigate("auth-verify-otp", {
        phoneNumber: data.data.phoneNumber,
        data: data.data,
        otp: data.data.otp,
        ccode: data.data.ccode,
      });
    },
    onError: (error) => console.error("Login error:", error),
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    if (phoneNumber.length === selectedCountry.length) {
      loginMutation.mutate({
        phone: phoneNumber,
        ccode: selectedCountry.dial,
      });
    } else {
      console.warn("Invalid phone number length");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.BackGround, padding: 20 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <BackButton style={{ opacity: 0.6 }} />

          <View style={{ padding: 5, marginTop: height * 0.05, width: width * 0.7 }}>
            <Text
              style={{
                fontSize: width * 0.07,
                fontWeight: "500",
                color: theme.ModeText1,
              }}
            >
              What’s your mobile number?
            </Text>
            <Text
              style={{
                fontSize: width * 0.047,
                color: theme.ModeText3,
                marginTop: height * 0.015,
              }}
            >
              We protect our community by making sure everyone on{" "}
              <Text style={{ color:theme.SpecialText }}>Kuuv</Text> is real.
            </Text>
          </View>

          <NumberVerification
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            // colors={"#000"}
          />

          {/* Footer pinned to bottom, moves up 10px on keyboard show */}
          <View
            style={{
              position: "absolute",
              bottom: keyboardVisible ? 10 : 0,
              left: 0,
              right: 0,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 0,
            }}
          >
            <Text
              style={{
                flex: 1,
                color: theme.ModeText3,
                fontSize: 13,
                paddingRight: 60,
              }}
            >
              We never share this with anyone and it won’t be your{" "}
              <Text style={{ color: theme.ModeText1}}>{" "}Profile</Text>
            </Text>

            <NextButton
              disabled={phoneNumber.length !== selectedCountry.length}
              onPress={handleLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
