import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import { handleLocationSelect } from "../../redux/locationSlice";
import BackButton from "../auth/components/Buttons/BackButton";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppTheme } from "../../../themeContext";

export default function AskLocation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasAskedOnce = useRef(false);

  const fetchLocation = async (triggerPermission = false) => {
    setLoading(true);

    try {
      let status;

      if (triggerPermission) {
        const res = await Location.requestForegroundPermissionsAsync();
        status = res.status;
        hasAskedOnce.current = true;
      } else {
        const res = await Location.getForegroundPermissionsAsync();
        status = res.status;
      }

      if (status !== "granted") {
        setPermissionDenied(true);
        setLoading(false);

        Alert.alert(
          "Location Permission Required",
          "Please enable location permission in your phone's settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }

      setPermissionDenied(false);

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        {
          headers: {
            "User-Agent": "Kuuv/1.0 (gummadicharan37@email.com)",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (data?.address) {
        const { city, state } = data.address;

        const locationInfo = {
          city: city || "",
          state: state || "",
          latitude,
          longitude,
          formattedAddress: [state, city].filter(Boolean).join(", "),
        };

        dispatch(handleLocationSelect(locationInfo));
        navigation.navigate("GroupSelection", { locationInfo });
      } else {
        setPermissionDenied(true);
      }
    } catch (error) {
      console.warn("Location fetch error:", error);
      setPermissionDenied(true);
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ Ask for permission after 2s
  useEffect(() => {
    if (!hasAskedOnce.current) {
      const timeout = setTimeout(() => {
        fetchLocation(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        flex: 1,
        backgroundColor: theme.BackGround,
        padding: 16,
        justifyContent: "flex-start",
      }}
    >
      <BackButton />

      <Text
        style={{
          fontSize: 35,
          color: theme.ModeText1,
          marginTop: "10%",
          marginBottom: "4%",
          marginLeft: "2%",
        }}
      >
        Please set your location
      </Text>

      <Text
        style={{
          fontSize: 17,
          color: theme.ModeText3,
          width: "80%",
          lineHeight: 22,
          marginBottom: 10,
          marginLeft: "2%",
        }}
      >
        We use your location to show you potential matches in your area.
      </Text>

      {permissionDenied && (
        <Text
          style={{
            color: "rgb(255,77,79)",
            fontSize: 16,
            marginTop: 20,
            backgroundColor: "rgba(255,77,79,0.1)",
            padding: 10,
            borderRadius: 10,
          }}
        >
          🚫 Location access was denied. Tap below to retry or open settings.
        </Text>
      )}

      <TouchableOpacity
        onPress={() => fetchLocation(true)}
        style={{
          position: "absolute",
          bottom: insets.bottom + 20,
          right: 20,
          paddingVertical: 14,
          paddingHorizontal: 26,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: theme.LineColor,
          backgroundColor: theme.ModeText3,
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.Icon} />
        ) : (
          <MaterialIcons name="my-location" size={28} color={theme.Icon} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
