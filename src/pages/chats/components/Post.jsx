import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useSelector } from "react-redux";

export default function Post({
  item,
  isMe,
  onPressMessage,
  onProfilePress,
  onExpressInterest,
  onShare,
}) {
  const user = useSelector((state) => state.user);
  const isOwnPost = item?.createdBy?.phone === user?.phone;

  const profilePic =
    item.createdBy?.profilePic?.trim() !== ""
      ? item.createdBy.profilePic
      : "https://img.favpng.com/11/8/12/logo-person-user-png-favpng-5g3QgzyddY0K7j3s9XuwB9mzv.jpg";

  const expressedInterestCount = item.expressedInterest?.length || 0;
  const alreadyExpressed = item.expressedInterest?.includes(
    item.createdBy?._id
  );

  // Format updatedAt time nicely (e.g. "6:45 PM")
  const formattedUpdatedAt = new Date(item.updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: isMe ? "flex-end" : "flex-start",
      }}
    >
      {!isMe && (
        <TouchableOpacity
          onPress={onProfilePress}
          accessibilityRole="imagebutton"
          accessibilityLabel="View profile"
        >
          <Image
            source={{ uri: profilePic }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
              borderWidth: 1,
              borderColor: "#ddd",
            }}
          />
        </TouchableOpacity>
      )}

      <View style={{ width: "75%" }}>
        {/* Message Box */}
        <TouchableOpacity
          onPress={onPressMessage}
          activeOpacity={0.9}
          style={{
            padding: 14,
            borderRadius: 16,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          }}
          accessibilityRole="button"
          accessibilityLabel="View post details"
        >
          {/* Header */}
          <Text
            style={{
              fontWeight: "600",
              fontSize: 14,
              color: "#5B4BFF",
              marginBottom: 8,
            }}
          >
            {item.createdBy?.name || item.createdBy?.phone}
          </Text>

          {/* Post Image */}
          {item.image && (
            <Image
              source={{
                uri: item.image.startsWith("data:image")
                  ? item.image
                  : `data:image/jpeg;base64,${item.image}`,
              }}
              style={{
                width: "100%",
                height: 160,
                borderRadius: 12,
                backgroundColor: "#f0f0f0",
                marginBottom: 10,
              }}
              resizeMode="contain"
              accessibilityRole="image"
              accessibilityLabel="Post image"
            />
          )}

          {/* Title + Description */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#222",
              marginBottom: 4,
            }}
            accessibilityRole="header"
            accessibilityLabel={`Title: ${item.title}`}
          >
            {item.title}
          </Text>
          <Text
            style={{ fontSize: 14, color: "#555", marginBottom: 6 }}
            accessibilityLabel={`Description: ${item.description}`}
          >
            {item.description}
          </Text>

          {/* Price & Interest */}
          <Text style={{ fontSize: 14, color: "#777", marginBottom: 4 }}>
            💰{" "}
            <Text style={{ fontWeight: "600", color: "#333" }}>
              {item.price}
            </Text>{" "}
            / {item.period}
          </Text>
          <Text style={{ fontSize: 12, color: "#999" }}>
            ❤️ Interest: {expressedInterestCount}
          </Text>
          {!isOwnPost && (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  if (alreadyExpressed) {
                    Alert.alert("Notice", "You already expressed interest.");
                  } else {
                    onExpressInterest(item);
                  }
                }}
                style={{
                  backgroundColor: alreadyExpressed ? "#ccc" : "#5B4BFF",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  marginRight: 10,
                  flex: 1,
                  alignItems: "center",
                }}
                accessibilityRole="button"
                accessibilityLabel={
                  alreadyExpressed
                    ? "Interest already expressed"
                    : "Express interest in this post"
                }
              >
                <Text
                  style={{
                    color: alreadyExpressed ? "#888" : "#fff",
                    fontWeight: "600",
                  }}
                >
                  {alreadyExpressed ? "Interest Expressed" : "Express Interest"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onShare(item)}
                style={{
                  backgroundColor: "#bbb",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  flex: 1,
                  alignItems: "center",
                }}
                accessibilityRole="button"
                accessibilityLabel="Share this post"
              >
                <Text style={{ color: "#333", fontWeight: "600" }}>
                  Share Now
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Updated At Time */}
          <Text
            style={{
              fontSize: 12,
              color: "#999",
              textAlign: "right",
              marginBottom: 8,
            }}
            accessibilityLabel={`Last updated at ${formattedUpdatedAt}`}
          >
            {formattedUpdatedAt}
          </Text>
        </TouchableOpacity>

        {/* Action Buttons (only if not own post) */}
      </View>
    </View>
  );
}
