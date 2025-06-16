import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import BASE_URL from "../../../../config";
import { useAppTheme } from "../../../../themeContext"
const { width } = Dimensions.get("window");

export default function ViewProfileFlipCard() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const userId = route.params?.userId;
  const { theme } = useAppTheme();
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    Animated.timing(animatedValue, {
      toValue: isFlipped ? 360 : 180,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      if (isFlipped) {
        animatedValue.setValue(0);
      }
      setIsFlipped(!isFlipped);
    });
  }

  useEffect(() => {
    async function fetchUserProfile() {
      if (!userId) {
        setErrorMsg("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          setErrorMsg("No auth token found");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();
        console.log("🔍 Full user profile response:", json);

        if (response.ok && json.status) {
          setProfileData(json.data);
        } else {
          setErrorMsg(json.error || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("❌ Network or fetch error:", err);
        setErrorMsg(err.message || "Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.BackGround, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <ActivityIndicator size="large" color="#4B61D1" />
        <Text style={{ color: "#BBBBBB", marginTop: 12, fontSize: 16 }}>Loading profile...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.BackGround, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "#FF5555", fontSize: 16, fontWeight: "bold" }}>Error: {errorMsg}</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.BackGround, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "#BBBBBB", marginTop: 12, fontSize: 16 }}>No profile data available</Text>
      </View>
    );
  }

  const formattedDate = new Date(profileData.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.BackGround, justifyContent: "center", alignItems: "center", padding: 24 }} showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View>
          <Animated.View style={{borderWidth:1,borderColor:theme.LineColor, width: width * 0.9, height: width * 1.1, borderRadius: 25, backgroundColor: theme.BackGround, padding: 20, shadowColor:theme.ModeText1, shadowOpacity: 0.5, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 10, backfaceVisibility: "hidden", transform: [{ rotateY: frontInterpolate }], zIndex: isFlipped ? 0 : 1 }}>
            <View style={{ alignItems: "center", marginBottom: 20, height: 140, justifyContent: "center" }}>
              {profileData.profilePic ? (
                <Image source={{ uri: profileData.profilePic }} style={{ width: 160, height: 140, borderRadius: 25, backgroundColor: "#444" }} />
              ) : (
                <Text style={{ color: theme.ModeText1, fontSize: 18 }}>No Image</Text>
              )}
            </View>

            <View style={{ paddingHorizontal: 12 }}>
              <Text style={{ color: theme.ModeText1, fontWeight: "900", fontSize: 28, textAlign: "center", marginBottom: 12 }}>{profileData.name || "No Name"}</Text>
              <Text style={{ color:theme.ModeText3, fontWeight: "500", fontSize: 16, marginTop: 10 }}>Phone: <Text style={{ color: theme.ModeText1, fontWeight: "700" }}>{profileData.ccode || ""} {profileData.phone || "N/A"}</Text></Text>
              <Text style={{ color: theme.ModeText3, fontWeight: "500", fontSize: 16, marginTop: 10 }}>Role: <Text style={{ color: theme.ModeText1, fontWeight: "700" }}>{profileData.role || "N/A"}</Text></Text>
              <Text style={{ color:theme.ModeText3, fontWeight: "500", fontSize: 16, marginTop: 10 }}>Description: <Text style={{ color: theme.ModeText1, fontWeight: "700", fontStyle: "italic" }}>{profileData.description || "N/A"}</Text></Text>
              <Text style={{ color: theme.ModeText3, fontWeight: "500", fontSize: 16, marginTop: 10 }}>Groups Joined: <Text style={{ color:theme.ModeText1, fontWeight: "700" }}>{profileData.groups ? profileData.groups.length : 0}</Text></Text>
              <Text style={{ color: theme.ModeText3, fontWeight: "500", fontSize: 16, marginTop: 10 }}>Created At: <Text style={{ color: theme.ModeText1, fontWeight: "700" }}>{formattedDate}</Text></Text>
              <Text style={{ marginTop: 20, color: theme.ModeText3, fontSize: 14, fontStyle: "italic", textAlign: "center" }}>Tap to see User ID</Text>
            </View>
          </Animated.View>

          <Animated.View style={{borderWidth:1,borderColor:theme.LineColor, width: width * 0.9, height: width * 1.2, backgroundColor: theme.BackGround, justifyContent: "center", alignItems: "center", borderRadius: 25, position: "absolute", top: 0, zIndex: isFlipped ? 1 : 0, transform: [{ rotateY: backInterpolate }], backfaceVisibility: "hidden" }}>
            <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: theme.ModeText3, fontWeight: "700", fontSize: 20, marginBottom: 2 }}>User ID</Text>
              <Text style={{ color: theme.ModeText1, fontWeight: "900", fontSize: 20, marginBottom: 0, textAlign: "center" }}>{profileData._id}</Text>
              {profileData.profilePic ? (
                <Image source={{ uri: profileData.profilePic }} style={{ width: width * 0.75, height: width * 0.75, borderRadius: 20, marginTop: 20, backgroundColor: "#444" }} />
              ) : (
                <Text style={{ color: "#888", fontSize: 18 }}>No Image</Text>
              )}
              <Text style={{ marginTop: 20, color: theme.ModeText3, fontSize: 14, fontStyle: "italic", textAlign: "center" }}>Tap to flip back</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
