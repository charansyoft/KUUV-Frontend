// ProfileStackNavigator.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfilePage from "../pages/profile/EditProfilePage"; // Adjust with actual component
import MyInformationPage from "../pages/profile/MyInformationPage"; // Adjust with actual component
import ProfilePage from "../pages/profile/ProfilePage"; // Adjust with actual component
// import ProfilePageHeader from "../components/headers/ProfilePageHeader";
// import MyInformationPageHeader from "../components/headers/MyInformationPageHeader";
// import EditProfilePageHeader from "../components/headers/EditProfilePageHeader";
import EditProfilePageHeader from "../components/header/profile-header/EditProfilePageHeader";
import MyInformationPageHeader from "../components/header/profile-header/MyInformationPageHeader";
import ProfilePageHeader from "../components/header/profile-header/ProfilePageHeader";
const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      {/* Profile Screen */}

      {/* My Information Screen */}
      <ProfileStack.Screen
        name="profile-my-information"
        component={MyInformationPage}
        options={{
          header: () => <MyInformationPageHeader />,

        }}
      />

      <ProfileStack.Screen
        name="profile"
        component={ProfilePage}
        options={{
          header: () => <ProfilePageHeader />, // Custom header for Profile Page
        }}
      />

      {/* Edit Profile Screen */}
      <ProfileStack.Screen
        name="profile-edit"
        component={EditProfilePage}
        options={{
          header: () => <EditProfilePageHeader />, // Custom header for Edit Profile Page
        }}
      />
    </ProfileStack.Navigator>
  );
}
