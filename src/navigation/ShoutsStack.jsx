import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoutsPage from "../pages/shouts/ShoutsPage";
import CustomHeader from "../components/header/CustomHeader";
import ShoutsHeader from "../pages/shouts/components/ShoutsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createStackNavigator();

export default function ShoutsStack() {
  return (
<SafeAreaView style={{flex:1, backgroundColor:"#000"}}>
        <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => <ShoutsHeader route={route} />,
      })}
    >
      <Stack.Screen name="ShoutsPage" component={ShoutsPage} />
    </Stack.Navigator>
</SafeAreaView>
  );
}
