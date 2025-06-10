import React from "react";
import { Dimensions, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function SystemMessage({ message }) {

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 5,
      }}
    >
      <Card
        style={{
          borderRadius: 10,
          elevation: 0,
          maxWidth: Dimensions.get("window").width * 0.9,
          marginVertical: 10,
        }}
      >
        <Card.Content
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              letterSpacing: -0.3,
            }}
          >
            {message?.text}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
