import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../../../themeContext";
import useGetJoinedGroupsByPhone from "../../../api/home/useGetJoinedGroupsByPhone";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../../config";

export default function JoinedGroupsList({ searchText }) {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const phoneNumber = useSelector((state) => state.user.phone);

  const [refreshKey, setRefreshKey] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [modalGroup, setModalGroup] = useState(null);
  const [visibleGroups, setVisibleGroups] = useState([]);
  const [isLongPressed, setIsLongPressed] = useState(false);

  const { apiGroups, loading, error } = useGetJoinedGroupsByPhone(
    phoneNumber,
    refreshKey
  );

  useEffect(() => {
    setVisibleGroups(apiGroups);
  }, [apiGroups]);

  useEffect(() => {
    if (refreshKey === 0) {
      if (loading) {
        setShowLoading(true);
      } else {
        const timer = setTimeout(() => {
          setShowLoading(false);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, refreshKey]);

  const handleDeleteGroup = async () => {
    if (!modalGroup?._id) return;
    try {
      setDeletingId(modalGroup._id);
      const token = await AsyncStorage.getItem("authToken");

      await axios.delete(`${BASE_URL}/deleteGroup`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { groupId: modalGroup._id },
      });

      setVisibleGroups((prev) =>
        prev.filter((group) => group._id !== modalGroup._id)
      );

      setModalGroup(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      Alert.alert("Delete Failed", err.message || "Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredApiGroups = visibleGroups.filter((group) =>
    group.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (showLoading) {
    return (
      <View style={{ padding: 44.5, alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.SpecialBackGround} />
      </View>
    );
  }

  if (error) {
    return (
      <Text style={{ padding: 15, color: theme.SpecialText }}>
        Error: {error}
      </Text>
    );
  }

  if (filteredApiGroups.length === 0) {
    return (
      <Text
        style={{
          padding: 20,
          textAlign: "center",
          color: theme.ModeText3,
          fontSize: 16,
        }}
      >
        No groups found.
      </Text>
    );
  }

  return (
    <View style={{ padding: 15, backgroundColor: theme.BackGround }}>
      {filteredApiGroups.map((group) => (
        <Animated.View
          key={group._id}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(300)}
          layout={Layout.springify()}
        >
          <TouchableOpacity
            delayLongPress={50}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: theme.BackGround,
              borderRadius: 20,
              padding: 12,
              borderWidth: 0.5,
              borderColor: theme.LineColor,
              marginBottom: 10,
              opacity: deletingId === group._id ? 0.4 : 1,
            }}
            onPress={() => {
              if (!isLongPressed) {
                navigation.navigate("chats", {
                  screen: "GroupChat",
                  params: { GroupId: group._id },
                });
              }
              setIsLongPressed(false); // reset
            }}
            // onLongPress={() => {
            //   setIsLongPressed(true);
            //   setModalGroup(group);
            // }}
          >
            <Image
              source={{
                uri:
                  group.image ||
                  "https://via.placeholder.com/60x60.png?text=Group",
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: theme.ModeText1,
                  fontSize: 16,
                  fontWeight: "500",
                }}
                numberOfLines={1}
              >
                {group.name}
              </Text>
              <Text
                style={{
                  color: theme.ModeText3,
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                {group.joinedUsers?.length > 10
                  ? "10+ Joined"
                  : `${group.joinedUsers?.length ?? 0} Joined`}
              </Text>
            </View>

            <Icon
              name="chevron-right"
              size={28}
              color={theme.Icon}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Delete Modal */}
      <Modal transparent visible={!!modalGroup} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              borderRadius: 15,
              padding: 20,
              alignItems: "center",
              elevation: 5,
            }}
          >
            {/* ⚠️ Icon and Title */}
            {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icon name="warning" size={24} color="#FF6B00" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
          Delete Group
        </Text>
      </View> */}

            {/* ⚠️ Description */}
            <Text
              style={{
                fontSize: 15,
                color: "#555",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Are you sure you want to delete the group "
              <Text style={{ fontWeight: "bold" }}>{modalGroup?.name}</Text>"?
            </Text>

            <View
              style={{
                borderRadius: 6,
                marginBottom: 10,
                padding: 6,
                backgroundColor: "rgba(255, 0, 0, 0.05)",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "#AA0000",
                  textAlign: "center",
                }}
              >
                Deleting this group will permanently remove all chats and data.
              </Text>
            </View>

            {/* Buttons */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => setModalGroup(null)}
                style={{
                  padding: 12,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: theme.LineColor,
                }}
              >
                <Text style={{ color: theme.ModeText1 }}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleDeleteGroup}
                style={{
                  padding: 12,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  backgroundColor: "#FF4D4D",
                }}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
