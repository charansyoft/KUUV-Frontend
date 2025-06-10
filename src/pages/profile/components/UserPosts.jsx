import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFetchUserPosts() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const response = await fetch("http://192.168.29.75:3000/GetUserPosts", {
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

  React.useEffect(() => {
    fetchUserPosts();
  }, []);

  return { data, loading, error, refetch: fetchUserPosts };
}

export default function UserPosts() {
  const { data, loading, error } = useFetchUserPosts();

  useEffect(() => {
    if (data) {
      console.log("User Posts Data:", data);
    }
    if (error) {
      console.log("Error fetching user posts:", error);
    }
  }, [data, error]);

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading posts...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data && data.length > 0 ? (
        data.map((post) => (
          <View key={post._id} style={styles.postCard}>
            {/* Image */}
            {post.image ? (
              <Image
                source={{ uri: `http://192.168.29.75:3000/uploads/${post.image}` }}
                style={styles.postImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noImage}>
                <Text>No Image</Text>
              </View>
            )}

            {/* Title */}
            <Text style={styles.postTitle}>{post.title || "No Title"}</Text>

            {/* Description */}
            <Text style={styles.postDescription}>
              {post.description || "No Description"}
            </Text>

            {/* Price and Period */}
            <Text style={styles.postPrice}>
              Price: ₹{post.price} / {post.period}
            </Text>

            {/* Expressed Interest Count */}
            <Text style={styles.postInterest}>
              Interested Users: {post.expressedInterest?.length || 0}
            </Text>

            {/* Group name chip */}
            {post.group && (
              <View style={styles.postedOnContainer}>
                <Text>Posted on</Text>
                <View style={styles.groupChipContainerInline}>
                  <Text style={styles.groupChipText}>{post.group}</Text>
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


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  container: {
    padding: 20,
  },
  postCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "rgb(238, 239, 255)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  postPrice: {
    fontSize: 14,
    marginBottom: 8,
  },
  postInterest: {
    fontSize: 14,
    color: "#888",
  },
  postedOnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  groupChipContainerInline: {
    backgroundColor: "#B0B5FF",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  groupChipText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
  },
});
