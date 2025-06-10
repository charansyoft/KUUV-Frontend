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

  return (
    <>
      <View
        style={{
          padding: width * 0.014, // ~7 on 375 width device
          borderRadius: 50,
          backgroundColor: "#000",
          marginTop: height * 0.03,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "auto",
              backgroundColor: "#000",
              borderRadius: 50,
              paddingVertical: height * 0.018, // ~15 on 680 height device
              paddingHorizontal: width * 0.025, // ~10 on 375 width device
            }}
            onPress={() => setDropdownOpen(true)}
          >
            <Text
              style={{
                color: "#000",
                marginLeft: 0,
                fontWeight: "400",
                fontSize: scaleFont(16),
              }}
            >
              {selectedCountry.code}
            </Text>
            <Text
              style={{
                color: "#000",
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
              color={"#000"}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Enter your mobile number"
            placeholderTextColor={"#000"}
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
              color: "#000",
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
            backgroundColor: "#000",
            height: height * 0.6,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 20,
          },
          backdrop: {
            backgroundColor: "#000",
          },
          textInput: {
            color: "#000",
            borderColor: "transparent",
            backgroundColor: "#000",
            fontSize: scaleFont(16),
          },
          dialCode: {
            color: "#000",
            fontSize: scaleFont(16),
          },
          countryName: {
            color: "#000",
            fontSize: scaleFont(16),
          },
          countryCode: {
            color: "#000",
            fontSize: scaleFont(16),
          },
          countryButtonStyles: {
            backgroundColor: "#000",
            borderBottomColor: "#000",
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
        inputPlaceholderTextColor={"#000"}
        onBackdropPress={() => setDropdownOpen(false)}
        onRequestClose={() => setDropdownOpen(false)}
      />
    </>
  );
}
