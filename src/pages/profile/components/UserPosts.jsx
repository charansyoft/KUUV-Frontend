import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useAppTheme } from "../../../../themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../../config";
export function useFetchUserPosts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const response = await fetch(`${BASE_URL}/GetUserPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Network response not ok");

      const json = await response.json();
      setData(json.data || json);
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return { data, loading, error, refetch: fetchUserPosts };
}

export default function UserPosts() {
  const { data, loading, error } = useFetchUserPosts();
  const { theme } = useAppTheme();

  useEffect(() => {
    if (data) console.log("User Posts Data:", data);
    if (error) console.log("Error fetching user posts:", error);
  }, [data, error]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {data && data.length > 0 ? (
        data.map((post) => (
          <View
            key={post._id}
            style={{
              padding: 15,
              marginBottom: 15,
              borderRadius: 10,
              position: "relative",
              borderWidth:1,
              borderColor:theme.LineColor,
            }}
          >
            {post.image ? (
              <Image
                source={{ uri: `${BASE_URL}/uploads/${post.image}` }}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 10,
                  backgroundColor: "#ccc",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text>No Image</Text>
              </View>
            )}

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
              {post.title || "No Title"}
            </Text>

            <Text style={{ fontSize: 14, color:theme.ModeText3, marginBottom: 8 }}>
              {post.description || "No Description"}
            </Text>

            <Text style={{color:theme.ModeText3, fontSize: 14, marginBottom: 8 }}>
              Price: ₹{post.price} / {post.period}
            </Text>

            <Text style={{ fontSize: 14, color: theme.ModeText3 }}>
              Interested Users: {post.expressedInterest?.length || 0}
            </Text>

            {post.group && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text>Posted on</Text>
                <View
                  style={{
                    backgroundColor: "#B0B5FF",
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    marginHorizontal: 5,
                  }}
                >
                  <Text
                    style={{
                      color: theme.ModeText1,
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    {post.group}
                  </Text>
                </View>
                <Text>Group</Text>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text>No posts found</Text>
      )}
    </ScrollView>
  );
}
