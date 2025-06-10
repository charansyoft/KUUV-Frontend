import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { handleLocationSelect } from "../../redux/locationSlice";
import BackButton from "../auth/components/Buttons/BackButton";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function AskLocation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      setPermissionDenied(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasAskedOnce.current) {
      fetchLocation(true);
    }
  }, []);

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: "#000", padding: 16 }}
    >
      <BackButton />

      <Text
        style={{
          fontSize: 35,
          color: "#000",
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
          color: "#000",
          width: "80%",
          lineHeight: 22,
          marginBottom: 10,
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
          🚫 Location access was denied. Please enable it or tap below to retry.
        </Text>
      )}

      <TouchableOpacity
        onPress={() => fetchLocation(false)}
        style={{
          position: "absolute",
          bottom: insets.bottom, // just above safe area, fallback 10 if inset is 0
          right: 20,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          paddingVertical: 14,
          paddingHorizontal: 26,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          shadowColor: "#00FFFF",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 6,
          elevation: 0.1,
        }}
        disabled={loading}
      >
        <MaterialIcons name="my-location" size={28} color="#00FFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
