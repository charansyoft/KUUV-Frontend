import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import BASE_URL from "../../../../config";

const { width } = Dimensions.get("window");

export default function ViewProfileFlipCard() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
const route = useRoute();
const userId = route.params?.userId; // Make sure it's passed via navigation

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
      animatedValue.setValue(0); // Reset after full circle
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

      const response = await fetch(
        `${BASE_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();

      // ✅ Log full response data
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
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4B61D1" />
        <Text style={styles.infoText}>Loading profile...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {errorMsg}</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>No profile data available</Text>
      </View>
    );
  }

  const formattedDate = new Date(profileData.createdAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={flipCard}>
        <View>
          {/* Front Side */}
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ rotateY: frontInterpolate }],
                zIndex: isFlipped ? 0 : 1,
              },
            ]}
          >
            <View style={styles.imageContainer}>
              {profileData.profilePic ? (
                <Image
                  source={{ uri: profileData.profilePic }}
                  style={styles.image}
                />
              ) : (
                <Text style={styles.noImageText}>No Image</Text>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.name}>{profileData.name || "No Name"}</Text>

              <Text style={styles.label}>
                Phone:{" "}
                <Text style={styles.value}>
                  {profileData.ccode || ""} {profileData.phone || "N/A"}
                </Text>
              </Text>

              <Text style={styles.label}>
                Role: <Text style={styles.value}>{profileData.role || "N/A"}</Text>
              </Text>

              <Text style={styles.label}>
                Description:{" "}
                <Text style={[styles.value, styles.description]}>
                  {profileData.description || "N/A"}
                </Text>
              </Text>

              <Text style={styles.label}>
                Groups Joined:{" "}
                <Text style={styles.value}>
                  {profileData.groups ? profileData.groups.length : 0}
                </Text>
              </Text>

              <Text style={styles.label}>
                Created At:{" "}
                <Text style={styles.value}>{formattedDate}</Text>
              </Text>

              <Text style={styles.flipHint}>Tap to see User ID</Text>
            </View>
          </Animated.View>

          {/* Back Side */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              {
                transform: [{ rotateY: backInterpolate }],
                position: "absolute",
                top: 0,
                zIndex: isFlipped ? 1 : 0,
              },
            ]}
          >
            <View style={styles.backContent}>
              <Text style={styles.userIdTitle}>User ID</Text>
              <Text style={styles.userId}>{profileData._id}</Text>

              {profileData.profilePic ? (
                <Image
                  source={{ uri: profileData.profilePic }}
                  style={styles.largeImage}
                />
              ) : (
                <Text style={styles.noImageText}>No Image</Text>
              )}

              <Text style={styles.flipHint}>Tap to flip back</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  infoText: {
    color: "#BBBBBB",
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#FF5555",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: width * 0.9,
    height: width * 1.1,
    borderRadius: 25,
    backgroundColor: "#1E1E1E",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
    backfaceVisibility: "hidden",
  },
  cardBack: {
    height: width * 1.2,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 140,
    justifyContent: "center",
  },
  image: {
    width: 160,
    height: 140,
    borderRadius: 25,
    backgroundColor: "#444",
  },
  largeImage: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: "#444",
  },
  noImageText: {
    color: "#888",
    fontSize: 18,
  },

  infoContainer: {
    paddingHorizontal: 12,
  },
  name: {
    color: "#eee",
    fontWeight: "900",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 12,
  },
  label: {
    color: "#bbb",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    color: "#4B61D1",
    fontWeight: "700",
  },
  description: {
    fontStyle: "italic",
  },
  flipHint: {
    marginTop: 20,
    color: "#888",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },

  backContent: {
    alignItems: "center",
    padding: 20,
  },
  userIdTitle: {
    color: "#bbb",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 2,
  },
  userId: {
    color: "#4B61D1",
    fontWeight: "900",
    fontSize: 26,
    marginBottom: 0,
    textAlign: "center",
  },
});
