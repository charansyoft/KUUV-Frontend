import React from "react";
// import ChatsPageHeader from "./ChatsPageHeader";
import HomePageHeader from "./HomePageHeader";
import ShoutsPageHeader from "./ShoutsPageHeader";
// import EditProfilePageHeader from "../components/header/profile-header/EditProfilePageHeader";
// import MyInformationPageHeader from "../components/header/profile-header/MyInformationPageHeader";
// import ProfilePageHeader from "../components/header/profile-header/ProfilePageHeader";

// import EditProfilePage from "../../pages/profile/EditProfilePage";
// import MyInformationPage from "../../pages/profile/MyInformationPage";
// import ProfileHeader from "./profile-header/MyInformationPageHeader";

export default function CustomHeader({ route }) {
  const getDeepestRouteName = (route) => {
    if (!route) return null;

    let currentRoute = route;
    while (currentRoute?.state && currentRoute.state.index != null) {
      currentRoute = currentRoute.state.routes[currentRoute.state.index];
    }
    return currentRoute.name;
  };

  const activeRouteName = getDeepestRouteName(route);

  // console.log("Current active route:", activeRouteName); // Debugging

  switch (activeRouteName) {
    case "home":
      return <HomePageHeader />;

    case "shouts":
      return <ShoutsPageHeader />;

    // case "chats":
    //   return <ChatsPageHeader />;

    default:
      return null;
  }
}
