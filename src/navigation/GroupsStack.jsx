import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import HomeGroupsList from "../pages/home/HomeGroupsList";
// import GroupDetailsPage from "../pages/groups/GroupDetailsPage";
import HomePageHeader from "../components/header/HomePageHeader";
const Stack = createNativeStackNavigator();

export default function GroupsStack() {
  const addresses = useSelector((state) => state.userSelectedAddress.addresses);
  console.log("CHECK3");

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeGroupsList"
        component={HomeGroupsList}
        options={{
          header: () => <HomePageHeader/>, // 👈 Use your custom header here
        }}
      />
      {/* <Stack.Screen name="GroupDetailsPage" component={GroupDetailsPage} /> */}
    </Stack.Navigator>
  );
}
