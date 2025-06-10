import React, { useEffect, useRef } from "react";
import { View, Text, Keyboard, Animated, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NextButton from "../Buttons/NextButton";
export default function LoginWithPhoneNumberPageFooter({
  phoneNumber,
  selectedCountry,
  onNextPress,
}) {
  const insets = useSafeAreaInsets();
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const keyboardHideEvent =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";

    const keyboardShowListener = Keyboard.addListener(
      keyboardShowEvent,
      (event) => {
        Animated.timing(footerAnim, {
          toValue: -event.endCoordinates.height + 20,
          duration: event.duration || 250,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardHideListener = Keyboard.addListener(
      keyboardHideEvent,
      (event) => {
        Animated.timing(footerAnim, {
          toValue: 0,
          duration: event.duration || 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [footerAnim]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: insets.bottom + 22, // fixes footer hiding behind navigation bar
        width: "100%",
        transform: [{ translateY: footerAnim }],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 13,
            color: "#000",
            lineHeight: 18,
          }}
        >
          We never share this with anyone and it won’t be your{" "}
          <Text style={{ color: "#000", fontWeight: "500" }}>Profile</Text>.
        </Text>

        <NextButton
          disabled={phoneNumber.length !== selectedCountry.length}
          onPress={onNextPress}
        />
      </View>
    </Animated.View>
  );
}

