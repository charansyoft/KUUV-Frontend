import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useFetchNotifications from "../../api/shouts/useFetchNotifications";
import NotificationPopUp from "./components/NotificationPopUp";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../../themeContext";
export default function ShoutsPage() {
  const { data, isLoading, error, refetch } = useFetchNotifications();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const { theme } = useAppTheme();
  useEffect(() => {
    const loadInitialNotifications = async () => {
      setVisible(true);
      await refetch();
    };
    loadInitialNotifications();
  }, [refetch]);

  const handleLoad = async () => {
    setLoading(true);
    setVisible(true);
    await refetch();
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  const onNotifPress = (notif) => {
    setSelectedNotif(notif);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedNotif(null);
  };

  const handleDelete = () => {
    console.log("Deleting notification:", selectedNotif);
    closeDialog();
  };

  const handleVisit = () => {
    console.log("Visiting notification:", selectedNotif);
    closeDialog();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.BackGround, paddingHorizontal: 10 }}
    >
      {visible && (
        <View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#BB86FC"
              style={{ marginTop: 0 }}
            />
          ) : error ? (
            <Text
              style={{
                color: "#CF6679",
                textAlign: "center",
                marginTop: 0,
              }}
            >
              Error loading notifications
            </Text>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#BB86FC"
                  colors={["#BB86FC"]}
                  progressBackgroundColor="#222"
                  contentContainerStyle={{ paddingBottom: 100 }}
                />
              }
            >
              {data?.notifications?.length > 0 ? (
                data.notifications.map((notif, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                      backgroundColor: theme.ModeText2,
                      padding: 12,
                      borderRadius: 16,
                      borderWidth: 0.5,
                      borderColor: theme.LineColor,
                    }}
                    onPress={() => onNotifPress(notif)}
                  >
                    <Image
                      source={{ uri: notif.fromUser.profilePic }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 15,
                        marginRight: 14,
                      }}
                    />
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 16,
                          color: theme.ModeText1,
                        }}
                      >
                        {notif.fromUser.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: theme.ModeText1,
                          marginTop: 4,
                        }}
                      >
                        {notif.message}
                      </Text>
                      {notif.postDetails?.updatedAt && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: theme.ModeText3,
                            marginTop: 4,
                            fontStyle: "italic",
                          }}
                        >
                          Updated: {formatDate(notif.postDetails.updatedAt)}
                        </Text>
                      )}
                    </View>
                    {notif.postDetails?.image && (
                      <Image
                        source={{ uri: notif.postDetails.image }}
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: 12,
                          marginLeft: 14,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <Text
                  style={{
                    color: "#777",
                    fontStyle: "italic",
                    marginTop: 20,
                    textAlign: "center",
                  }}
                >
                  No notifications available.
                </Text>
              )}
            </ScrollView>
          )}
        </View>
      )}

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: theme.BackGround,
          paddingVertical: 15,
          paddingHorizontal: 15,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: theme.LineColor,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleLoad}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator size={24} color={theme.Icon} />
        ) : (
          <Icon name="refresh" size={24} color={theme.Icon} />
        )}
      </TouchableOpacity>

      <NotificationPopUp
        visible={dialogVisible}
        onDismiss={closeDialog}
        notif={selectedNotif}
        onDelete={handleDelete}
        onVisit={handleVisit}
      />
    </SafeAreaView>
  );
}
