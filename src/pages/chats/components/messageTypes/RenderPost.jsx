// RenderPost.jsx
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const RenderPost = ({ post, getFormattedDate }) => {
  return (
    <View
    style={{
      margin: 10,
      backgroundColor: "#000",
      borderRadius: 12,
      padding: 15,
      width: "85%",
      alignSelf: "flex-start",
      position: "relative", // Added to allow absolute positioning of the arrow
    }}
  >
    {/* Top Row */}
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: post.profileImage }}
          style={{ width: 36, height: 36, borderRadius: 18, marginRight: 15 }}
        />
        <View>
          <Text style={{ marginBottom: 5, color: "#000", fontWeight: "bold" }}>
            {post.username}
          </Text>
          <Text style={{ color:"#000", fontSize: 12 }}>
            {getFormattedDate(post.postDate)}
          </Text>
        </View>
      </View>
      <Entypo
        name="dots-three-vertical"
        color={"#000"}
        size={18}
        style={{ marginTop: 6 }}
      />
    </View>

    {/* Post Image */}
    <Image
      source={{ uri: post.image }}
      style={{ height: 180, marginTop: 10, borderRadius: 10 }}
    />

    {/* Info Section */}
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
      }}
    >
      ₹{post.price}
    </Text>
    <Text
      style={{ color: "#000", fontSize: 14, fontWeight: "500", marginTop: 6 }}
    >
      {post.title}
    </Text>
    <Text style={{ color: "#000", fontSize: 13, marginTop: 4 }}>
      {post.description}
    </Text>

    {/* Buttons */}
    <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
      <TouchableOpacity
        style={{
          width: "50%",
          backgroundColor: "#000",
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#000", textAlign: "center" }}>
          Express Interest
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "45%",
          backgroundColor: "#000",
          borderColor: "#000",
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "#000", textAlign: "center" }}>Share Now</Text>
      </TouchableOpacity>
    </View>

    {/* Interested Count */}
    <Text style={{ color:"#000" , fontSize: 12, marginTop: 10 }}>
      {post.interestedCount} interested
    </Text>

    {/* Bottom Right Arrow */}
    <TouchableOpacity
      style={{
        position: "absolute", // Positions the arrow relative to the parent
        bottom: 10, // 10 units from the bottom
        right: 10, // 10 units from the right
      }}
    >
      <Ionicons name="chevron-forward" size={18} style={{marginRight:10}} color={"#000"} />
    </TouchableOpacity>
  </View>
  )

};
