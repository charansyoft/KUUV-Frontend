import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFetchUserProfileMutation } from "../../api/useFetchUserProfileMutation";
import UserPosts from "./components/UserPosts";
import { useAppTheme } from "../../../themeContext";
export default function MyInformationPage() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useAppTheme();
  // Create a function to load user profile data
  const loadUserProfile = useCallback(async () => {
    setLoading(true);
    const { data, error } = await useFetchUserProfileMutation();
    console.log("MY INFORMATION:", data);
    if (data) setUserData(data);
    if (error) setError(error);
    setLoading(false);
  }, []);

  // Use useFocusEffect to reload profile when screen comes into focus (including after going back)
  useFocusEffect(
    useCallback(() => {
      loadUserProfile();
    }, [loadUserProfile])
  );

  return (
    <ScrollView style={{ backgroundColor:theme.BackGround, flex: 1 }}>
      <View style={{ backgroundColor: theme.BackGround, flex: 1 }}>
        {loading && (
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" color={theme.ModeText1} />
            <Text style={{ color:theme.ModeText1, marginTop: 8,textAlign:"center" }}>Loading...</Text>
          </View>
        )}

        {error && (
          <View style={{ flex: 1, justifyContent: "top", alignItems: "top" }}>
            <Text style={{ color: "red" }}>Failed to load profile</Text>
          </View>
        )}

        {!loading && !error && userData && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: theme.BackGround,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                width: 100,
                height: 120,
                borderRadius: 30,
                marginRight: 20,
                backgroundColor: theme.BackGround,
                borderWidth: 1,
                borderColor: theme.LineColor,
                justifyContent: "top",
                alignItems: "top",
                overflow: "hidden",
              }}
            >
              {userData.profilePic ? (
                <Image
                  source={{ uri: userData.profilePic }}
                  style={{ width: 100, height: 120, borderRadius: 30 }}
                  resizeMode="cover"
                />
              ) : (
                <Text style={{ color:theme.BackGround }}>No Image</Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: theme.ModeText1,
                  }}
                >
                  {userData.name || "No name available"}
                </Text>
                {userData.name && (
                  <Icon
                    name="check-decagram"
                    size={18}
                    color="#1DA1F2"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.ModeText1,
                  opacity: 0.8,
                  fontWeight: "500",
                  marginTop: 4,
                }}
              >
                {userData.phone || "No phone available"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.ModeText1,
                  marginTop: 6,
                }}
              >
                {userData.description || "No description available"}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  marginTop: 10,
                  borderWidth:1,
                  borderColor:theme.LineColor,
                  alignSelf: "flex-start",
                }}
                onPress={() =>
                  navigation.navigate("profile-edit", {
                    phoneNumber: userData?.phone,
                  })
                }
              >
                <Icon name="pencil-outline" size={16} color={theme.Icon} />
                <Text
                  style={{
                    color: theme.ModeText1,
                    fontSize: 14,
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <UserPosts />
      </View>
    </ScrollView>
  );
}
