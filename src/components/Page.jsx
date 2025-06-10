import React from "react";
import { View } from "react-native";
import Modals from "./modals/Modals";
import { useAppTheme } from "../../themeContext";
export default function Page({ children }) {
  const { theme } = useAppTheme();
  return (
    <View style={{ flex: 1 ,backgroundColor:theme.BackGround}}>
      {children}
      <Modals />
    </View>
  );
}
