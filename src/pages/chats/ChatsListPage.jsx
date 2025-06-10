import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ChatsFilter from "./components/ChatsFilter";
import ChatsSearch from "./components/ChatsSearch";
import { useGetChatsByPhoneMutation } from "../../api/chats/personalChats/useGetChatsByPhoneMutation.js";
import { useAppTheme } from "../../../themeContext.jsx";
export default function ChatsListPage({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useAppTheme();
  const phone = useSelector((state) => state.user.phone);
  const route = useRoute();

  // Track targetUserId from params (handle changes in params)
  const [targetUserId, setTargetUserId] = useState(route.params?.targetUserId);
  useEffect(() => {
    if (route.params?.targetUserId) {
      setTargetUserId(route.params.targetUserId);
    }
  }, [route.params?.targetUserId]);

  const autoOpenedRef = useRef(false);

  const { mutate } = useGetChatsByPhoneMutation({
    onSuccess: (transformedChats) => {
      setChatData(transformedChats);
    },
  });

  const fetchChats = useCallback(() => {
    if (phone) {
      setLoading(true);
      mutate(phone, {
        onSettled: () => {
          setLoading(false);
          setRefreshing(false);
        },
      });
    }
  }, [phone, mutate]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Auto-open chat when data and targetUserId are ready
  useEffect(() => {
    if (targetUserId && chatData.length > 0 && !autoOpenedRef.current) {
      const matchedChat = chatData.find((chat) => chat.userId === targetUserId);
      if (matchedChat) {
        autoOpenedRef.current = true;
        navigation.navigate("PersonalChat", { item: matchedChat });
      }
    }
  }, [chatData, targetUserId, navigation]);

  const filteredChats = chatData.filter((chat) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Unread" && chat.Notifications.length > 0) ||
      (activeFilter === "Fav" && chat.Favorite) ||
      (activeFilter === "Important" && chat.Important);

    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleChatPress = (item) => {
    navigation.navigate("PersonalChat", {
      ChatId: item.id,
      opponentId: item.opponentUserId,
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchChats();
  };

  if (loading && chatData.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.BackGround,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#4e9fff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>
          Loading your chats...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.BackGround }}>
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4e9fff"
            colors={["#000"]}
          />
        }
        ListHeaderComponent={
          <>
            <ChatsFilter setActiveFilter={setActiveFilter} />
            <ChatsSearch searchText={searchText} setSearchText={setSearchText} />
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleChatPress(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 14,
              marginHorizontal: 15,
              borderWidth: 1,
              borderColor: theme.LineColor,
              marginBottom: 15,
              borderRadius: 20,
            }}
          >
            {item.profilePic ? (
              <Image
                source={{ uri: item.profilePic }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                  marginRight: 15,
                }}
              />
            ) : (
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 15,
                  marginRight: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: theme.ModeText1,
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  ?
                </Text>
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: theme.ModeText1,
                  marginBottom: 4,
                }}
              >
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, color: theme.ModeText3 }}>
                {item.lastMessage}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.ModeText3,
                }}
              >
                {item.lastMessageTime}
              </Text>
              {item.unreadCount > 0 && (
                <View
                  style={{
                    marginTop: 6,
                    backgroundColor: "rgb(81, 254, 98)",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    {item.unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
