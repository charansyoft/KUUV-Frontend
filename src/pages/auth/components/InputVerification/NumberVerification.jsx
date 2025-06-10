import React from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "../../../../../themeContext"
const { width, height } = Dimensions.get("window");

// Utility function to scale font sizes based on screen width
const scaleFont = (size) => Math.round((size * width) / 375); // 375 is a base screen width (iPhone 8)

export default function NumberVerification({
  selectedCountry,
  setSelectedCountry,
  phoneNumber,
  setPhoneNumber,
  dropdownOpen,
  setDropdownOpen,
}) {
  const { theme } = useAppTheme();

  return (
    <>
      <View
        style={{
          padding: width * 0.014, // ~7 on 375 width device
          borderRadius: 50,
          backgroundColor: "rgba(0, 0, 0, 0.10)",
          marginTop: height * 0.03,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "auto",
              backgroundColor: theme.LineColor,
              borderRadius: 50,
              paddingVertical: height * 0.018, // ~15 on 680 height device
              paddingHorizontal: width * 0.025, // ~10 on 375 width device
            }}
            onPress={() => setDropdownOpen(true)}
          >
            <Text
              style={{
                color: theme.ModeText2,
                marginLeft: 0,
                fontWeight: "400",
                fontSize: scaleFont(16),
              }}
            >
              {selectedCountry.code}
            </Text>
            <Text
              style={{
                color: theme.ModeText2,
                marginLeft: 7,
                fontWeight: "400",
                fontSize: scaleFont(16),
              }}
            >
              {selectedCountry.dial}
            </Text>
            <Feather
              name="chevron-down"
              size={scaleFont(18)}
              color={theme.ModeText2}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor={theme.ModeText3}
            value={phoneNumber}
            onChangeText={(text) => {
              // Remove all non-digit characters from input
              const digitsOnly = text.replace(/\D/g, "");
              setPhoneNumber(digitsOnly);
            }}
            onFocus={() => setDropdownOpen(false)}
            maxLength={selectedCountry.length}
            keyboardType="number-pad" // still useful for mobile
            style={{
              flex: 1,
              color: theme.ModeText1,
              fontSize: phoneNumber.length > 0 ? scaleFont(18) : scaleFont(16),
              paddingLeft: 12,
              borderWidth: 0,
              outlineStyle: "none",
            }}
          />
        </View>
      </View>

      <CountryPicker
        show={dropdownOpen}
        lang="en"
        style={{
          modal: {
            backgroundColor: theme.BackGround,
            height: height * 0.6,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 20,
          },
          backdrop: {
            backgroundColor: "#fff",
          },
          textInput: {
            color: theme.ModeText1,
            borderColor: "transparent",
            backgroundColor: theme.BackGround,
            fontSize: scaleFont(16),
          },
          dialCode: {
            color: "#000",
            fontSize: scaleFont(16),
          },
          countryName: {
            color: theme.ModeText1,
            fontSize: scaleFont(16),
          },
          countryCode: {
            color: theme.ModeText1,
            fontSize: scaleFont(16),
          },
          countryButtonStyles: {
            backgroundColor: theme.BackGround,
            borderBottomColor: theme.LineColor,
            borderBottomWidth: 1,
            paddingVertical: height * 0.015,
            paddingHorizontal: width * 0.03,
          },
          flag: {
            fontSize: scaleFont(20),
          },
        }}
        pickerButtonOnPress={(item) => {
          setSelectedCountry({
            code: item.code,
            dial: item.dial_code,
            name: item.name,
            length: 10, // You can add dynamic length here if you want
          });
          setDropdownOpen(false);
        }}
        inputPlaceholder="Search country or code"
        inputPlaceholderTextColor={theme.ModeText3}
        onBackdropPress={() => setDropdownOpen(false)}
        onRequestClose={() => setDropdownOpen(false)}
      />
    </>
  );
}
