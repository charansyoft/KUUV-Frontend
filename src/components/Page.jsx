import React from "react";
import { View } from "react-native";
import Modals from "./modals/Modals";

export default function Page({ children }) {
  return (
    <View style={{ flex: 1 ,backgroundColor:"#000"}}>
      {children}
      <Modals />
    </View>
  );
}
