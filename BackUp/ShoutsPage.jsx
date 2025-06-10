import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export default function ShoutsPage() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUserPhone = useSelector((state) => state.user.phone);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth - 60;

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get("http://192.168.29.75:3000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays < 7 ? `${diffInDays}d ago` : posted.toLocaleDateString();
  };

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleShare = async (post) => {
    try {
      const shareContent = `
  User: ${post.phone || "Unknown"}
  Title: ${post.text || "No content"}
  Likes: ${post.likedBy?.length || 0}
  Image URL: ${post.media?.[0] || "No image available"}
      `.trim();

      await Share.share({ message: shareContent });
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `http://192.168.29.75:3000/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedPost = response.data?.post;
      const formattedLikedBy = updatedPost.likedBy.map((entry) => ({
        phone: entry.user?.phone || null,
        date: entry.date,
      }));

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likedBy: formattedLikedBy } : post
        )
      );
    } catch (error) {
      console.error(
        "Error liking/unliking post:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 15 }}
      >
        {posts.length > 0 ? (
          posts.map((post) => {
            const likedPhones = post.likedBy?.map((like) => like.phone);
            const isLiked = likedPhones?.includes(currentUserPhone);
            const firstLetter = (post.phone || "U")[0].toUpperCase();

            return (
              <View
                key={post._id}
                style={{
                  backgroundColor:"#000",
                  padding: 15,
                  borderRadius: 15,
                  marginBottom: 20,
                }}
              >
                {/* User Info */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor:"#000",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                      }}
                    >
                      {firstLetter}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                      }}
                    >
                      {post.phone || "User"}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 12,
                      }}
                    >
                      {getTimeAgo(post.createdAt)}
                    </Text>
                  </View>
                </View>

                {/* Post Text */}
                <Text
                  style={{ color: "#000", marginBottom: 10 }}
                >
                  {post.text || "No content available."}
                </Text>

                {/* Images */}
                {post.media?.length > 0 && (
                  <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={imageWidth}
                    decelerationRate="fast"
                    scrollEventThrottle={16}
                  >
                    {post.media.map((img, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleImagePress(img)}
                      >
                        <Image
                          source={{ uri: img }}
                          style={{
                            width: imageWidth,
                            height: 200,
                            borderRadius: 15,
                            marginRight: 10,
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                {/* Like & Share */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleLike(post._id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 20,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={isLiked ? "heart" : "heart-outline"}
                      size={24}
                      color={isLiked ? "#F00000" : "#FFFFFF"}
                    />
                    <Text
                      style={{ color: "#000", marginLeft: 5 }}
                    >
                      {isLiked ? "Unlike" : "Like"} ({post.likedBy?.length || 0}
                      )
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleShare(post)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={22}
                      color={"#000"}
                    />
                    <Text
                      style={{ color: "#000", marginLeft: 5 }}
                    >
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Tags */}
                {post.tags?.length > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginTop: 10,
                    }}
                  >
                    {post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        style={{ marginRight: 8, marginBottom: 8 }}
                        compact
                      >
                        {tag}
                      </Chip>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <Text style={{ color:"#000" }}>
            No posts available.
          </Text>
        )}
      </ScrollView>

      {/* Fullscreen Image Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setIsModalVisible(false)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "90%", height: "70%", borderRadius: 15 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}