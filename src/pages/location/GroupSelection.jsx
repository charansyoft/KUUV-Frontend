import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from "../auth/components/Buttons/BackButton";
import SelectOtherCity from "./components/SelectOtherCity";
import ContinueFooter from "./components/ContinueFooter";
import ScrollContent from "./components/ScrollContent";
import { useSelector } from "react-redux";
import useFetchGroupsMutation from "../../api/Location/useFetchGroupsMutaion";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../../themeContext";
export default function GroupSelection() {
  const navigation = useNavigation();
  const route = useRoute();
  const { locationInfo } = route.params || {};
  const phone = useSelector((state) => state.user.phone);
  const { theme } = useAppTheme();
  const { fetchedGroups, loading, userId } = useFetchGroupsMutation(
    locationInfo,
    phone
  );

  const previouslyJoinedGroupIds = useMemo(() => {
    return fetchedGroups
      .filter((group) => group.joinedUsers.some((user) => user.phone === phone))
      .map((group) => group._id);
  }, [fetchedGroups, phone]);

  const [joinedGroups, setJoinedGroups] = useState([]);

  //   useEffect(() => {
  //     if (previouslyJoinedGroupIds.length > 0 && joinedGroups.length === 0) {
  // navigation.reset({
  //   index: 0,
  //   routes: [{ name: "home" }],
  // });

  //     }
  //   }, [previouslyJoinedGroupIds, joinedGroups.length, navigation]);

  const generateRandomInitials = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = Math.floor(Math.random() * 2) + 4;
    return Array.from(
      { length },
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join("");
  };

  const initialsMap = useMemo(() => {
    return fetchedGroups.reduce((acc, group) => {
      acc[group._id] = generateRandomInitials();
      return acc;
    }, {});
  }, [fetchedGroups]);

  const handleJoin = (group) => {
    if (joinedGroups.includes(group._id)) {
      setJoinedGroups(joinedGroups.filter((id) => id !== group._id));
    } else {
      setJoinedGroups([...joinedGroups, group._id]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.BackGround, padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 0,
          marginBottom: 10,
          paddingHorizontal: 0,
        }}
      >
        <BackButton style={{ marginTop: 0 }} />
        <SelectOtherCity locationInfo={locationInfo} />
      </View>

      <View
        style={{
          flex: 1,
          borderRadius:20,
          backgroundColor:"rgba(173, 173, 173, 0.3)", // subtle lighter transparent for dark
          paddingTop: 30,
          marginHorizontal: 0,
          marginBottom: 15,
          borderWidth:1,
          borderColor:theme.LineColor
        }}
      >
        <Text
          style={{
            color: theme.ModeText1, // lighter text for dark theme
            fontSize: 25,
            fontWeight: "500",
            textAlign: "center",
            marginBottom: 5,
            paddingHorizontal: 20,
          }}
        >
          We found some groups in your location
        </Text>

        <Text
          style={{
            color: theme.ModeText3,
            fontSize: 15,
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          {loading ? "Loading groups..." : "Join Groups"}
        </Text>

        <Text
          style={{
            color: theme.ModeText1,
            fontSize: 14,
            fontWeight: "500",
            marginBottom: 10,
            marginHorizontal: 10,
            textAlign: "center", // ✅ centers text inside container
            alignSelf: "center",
          }}
        >
          {fetchedGroups.length} groups to join
        </Text>

        <ScrollContent
          groups={fetchedGroups}
          joinedGroups={joinedGroups}
          handleJoin={handleJoin}
          initialsMap={initialsMap}
          userId={userId}
          loggedInPhone={phone}
          previouslyJoinedGroupIds={previouslyJoinedGroupIds}
        />
      </View>

      <ContinueFooter
        joinedCount={joinedGroups.length}
        joinedGroups={joinedGroups}
        state={locationInfo?.state}
        city={locationInfo?.city}
        phone={phone}
        userId={userId}
        previouslyJoinedGroupIds={previouslyJoinedGroupIds}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
