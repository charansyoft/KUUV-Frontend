import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function NotificationItem({ item }) {
  return (
    <View>
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 14,
            backgroundColor: "#DAD1FB36",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Image
            source={{ uri: item.profilePic }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 20,
            }}
          />
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 15.5,
            color: "#FFFFFF",
            fontFamily: "Inter",
          }}
        >
          {item.name}{" "}
          {item.status === "connect"
            ? "sent a connection request to you."
            : item.status === "accept"
            ? "ordered a service you posted."
            : "liked your post."}
        </Text>
        {item.status !== "liked" && (
          <TouchableOpacity
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                backgroundColor: "#FFFFFF",
                padding: 5,
                borderRadius: 6,
                paddingLeft: 8,
                paddingRight: 8,
                color: "#000000",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.status}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
