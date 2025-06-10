import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useJoinGroupMutation } from "../../api/useJoinGroupMutation";
import { useCheckGroupStatusQuery } from "../../api/useCheckGroupStatusQuery";

export default function GroupDetailsPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, onGoBack } = route.params;
  const phoneNumber = useSelector((state) => state.user.phone);
  const [joined, setJoined] = useState(null);

  // Fetch group joined status
  const {
    data: statusData,
    isLoading: isStatusLoading,
    isError,
  } = useCheckGroupStatusQuery({
    phoneNumber,
    groupName: item.name,
  });

  // Join group mutation
  const { mutate: joinGroup, isLoading: isJoining } = useJoinGroupMutation();

  // Update local `joined` state when fetch completes
  useEffect(() => {
    console.log("Group status data:", statusData); // Debug log to check response
    if (statusData?.status === true) {
      setJoined(true);
    } else if (statusData?.status === false) {
      setJoined(false);
    }
  }, [statusData]);

  const handleJoinGroup = async () => {
    if (isJoining) {
      Alert.alert("Joining", "Already in process of joining...");
      return;
    }

    joinGroup(
      { phoneNumber, groupId: item._id },
      {
        onSuccess: (response) => {
          if (response?.success) {
            setJoined(true);
            if (onGoBack) onGoBack();

            // ✅ Navigate to ChatPage with group data
            navigation.navigate("home-stack", {
              screen: "chats",
              params: {
                screen: "ChatPage",
                params: {
                  groupName: item.name,
                  groupImage: item.image,
                  groupData: item, // send entire group object if needed
                },
              },
            });
          } else {
            Alert.alert("Error", response?.message || "Failed to join group.");
          }
        },
        onError: (err) => {
          console.error("Join error:", err);
          Alert.alert("Error", "Unexpected error occurred.");
        },
      }
    );
  };

  const handleGoBack = () => {
    navigation.navigate("home", {
      screen: "HomeGroupsList",
    });
  };

  return (
    <ScrollView style={{backgroundColor:"#000", padding:20}}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity
          onPress={handleGoBack}
          style={{ padding: 5, marginRight: 10 }}
        >
          <Ionicons name="chevron-back" size={28} color={"#000"} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "600", color:"#000" }}>
          Group Details
        </Text>
      </View>

      {/* Group Name */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#000",
        }}
      >
        {item.name}
      </Text>

      {/* Group Image */}
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginBottom: 20,
          }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            borderWidth:1,
            borderColor: "#000",
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "#000" }}>
            No Image Available
          </Text>
        </View>
      )}

      {/* Join Status */}
      {isStatusLoading ? (
        <Text style={{ fontSize: 18, color: "#aaa" }}>Checking status...</Text>
      ) : joined === true ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Ionicons
            name="checkmark-circle"
            size={26}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 20, color: "#000" }}>Joined</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleJoinGroup}
          disabled={isJoining}
        >
          <Text style={{ fontSize: 20, color: "#000" }}>
            {isJoining ? "Joining..." : "Join"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}
