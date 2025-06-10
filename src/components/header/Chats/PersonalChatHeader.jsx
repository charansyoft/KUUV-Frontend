import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "../../../../themeContext";
export default function PersonalChatHeader() {
  const route = useRoute();
  const opponent = route.params?.opponentId;
  const [opponentDetails, setOpponentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useAppTheme();
  const shimmerOpacity = new Animated.Value(0.3);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerOpacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const fetchOpponentDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token || !opponent) return;

        const response = await axios.get(`http://192.168.29.75:3000/users/${opponent}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOpponentDetails(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching opponent:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOpponentDetails();
  }, [opponent]);

  const handleViewProfile = () => {
    console.log("👤 Full opponent data:", opponentDetails);
  };

  if (loading) {
    return (
      <View style={{ marginTop: 35, padding: 10, backgroundColor: theme.BackGround }}>
        <View
          style={{
            padding: 10,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#111",
            borderColor: theme.LineColor,
            borderWidth: 1,
          }}
        >
          <Animated.View
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: "#333",
              opacity: shimmerOpacity,
              marginRight: 12,
            }}
          />

          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                width: "60%",
                height: 16,
                borderRadius: 4,
                backgroundColor: "#333",
                opacity: shimmerOpacity,
              }}
            />
            <Animated.View
              style={{
                width: "40%",
                height: 12,
                borderRadius: 4,
                backgroundColor: "#333",
                marginTop: 10,
                opacity: shimmerOpacity,
              }}
            />
            <Animated.View
              style={{
                width: 80,
                height: 12,
                borderRadius: 4,
                backgroundColor: "#333",
                marginTop: 12,
                opacity: shimmerOpacity,
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 35, padding: 10, backgroundColor: theme.BackGround }}>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          borderColor: theme.LineColor,
          borderWidth: 1,
          backgroundColor:theme.BackGround,
        }}
      >
        {opponentDetails?.profilePic ? (
          <Image
            source={{ uri: opponentDetails.profilePic }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              marginRight: 12,
            }}
          />
        ) : (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              backgroundColor: "#444",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Text style={{ color: "#ccc", fontSize: 22, fontWeight: "bold" }}>?</Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: theme.ModeText1 }}>
            {opponentDetails?.name || opponentDetails?.phone || "Unknown"}
          </Text>
          <Text style={{ fontSize: 13, color: theme.ModeText3, marginTop: 2 }}>
            Role: {opponentDetails?.role || "N/A"}
          </Text>

          <TouchableOpacity
            onPress={handleViewProfile}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <Text style={{ fontSize: 13, color: "#4e9fff", marginRight: 4 }}>
              View Profile
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color="#4e9fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
