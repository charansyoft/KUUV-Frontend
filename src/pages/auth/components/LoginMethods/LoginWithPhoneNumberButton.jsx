import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import { Button } from "react-native-paper";
import { useAppTheme } from "../../../../../themeContext";
export default function LoginWithPhoneNumberButton() {
  const navigation = useNavigation();
const { theme } = useAppTheme();

  return (
    <Button
    style={{marginTop:150,width:"90%",paddingVertical:5, backgroundColor: theme.SpecialBackGround}}
      mode="contained"
      labelStyle={{
        fontSize: 15,
        fontWeight: "700",
        color: theme.ModeText2,
      }}
      icon={() => (
        <Image
          source={require("../../../../assets/smartphone.png")}
          style={{ width: 24, height: 24 }}
        />
      )}
      onPress={() => navigation.navigate("auth-phone-number")}
    >
      Login with Phone
    </Button>
  );
}
