import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef } from "react";
import { FlatList, Modal, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationItem from "./components/NotificationItem";

const userData = [
  {
    id: 1,
    name: "John Doe",
    status: "connect",
    profilePic:
      "https://st3.depositphotos.com/1006318/37105/v/1600/depositphotos_371056200-stock-illustration-man-head-avatar-beautiful-human.jpg",
    date: "2025-03-21",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "liked",
    profilePic:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
    date: "2025-03-21",
  },
];
export default function NotificationsModal({ open, handleClose }) {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "50%"], []);

  useEffect(() => {
    if (open && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [open]);

  const getCategory = (date) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];
    const lastWeek = new Date(Date.now() - 7 * 86400000)
      .toISOString()
      .split("T")[0];

    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";
    if (date >= lastWeek) return "This Week";
    return "Last Week";
  };

  const categorizedData = userData.reduce((acc, user) => {
    const category = getCategory(user.date);
    if (!acc[category]) acc[category] = [];
    acc[category].push(user);
    return acc;
  }, {});

  return (
    <Modal visible={open} transparent animationType="fade">
      <GestureHandlerRootView
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onClose={handleClose}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "#111" }}
          handleIndicatorStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Light color for visibility
            width: 40,
            height: 4,
            borderRadius: 2,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#111", // <-- Ensure content is black too
            }}
          >
            <View style={{ flex: 1, paddingBottom: 10 }}>
              <FlatList
                data={Object.entries(categorizedData)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => {
                  const [category, users] = item;
                  return (
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#FFFFFF",
                          marginVertical: 10,
                          opacity: 0.5,
                          marginLeft: 15,
                        }}
                      >
                        {category}
                      </Text>
                      {users.map((user) => (
                        <NotificationItem item={user} />
                      ))}
                    </View>
                  );
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </Modal>
  );
}
