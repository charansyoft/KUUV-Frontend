import { View } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import { Text } from "react-native-paper";
import Message from "./messageTypes/Message";

export default function MessageBubble({ message }) {
  const isMyMessage = message?.createdBy?._id === "1";
  const isSystemMessage = message?.payload?.type === "system";

  if (isSystemMessage) {
    return <Message message={message} />;
  }

  return (
    <View
      key={message.id}
      style={{
        flex: 1,
        alignItems: isMyMessage ? "flex-end" : "flex-start",
      }}
    >
      <View>
        <View style={{ alignSelf: "flex-start" }}>
          <SquircleView
            style={{
              margin: 4,
              padding: 12,
              rowGap: 5,
            }}
            squircleParams={{
              cornerSmoothing: 0.5,
              cornerRadius: 12,
              fillColor: isMyMessage
            }}
          >
            <Message message={message} />
            <View style={{ alignSelf: "flex-end" }}>
              <Text
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                  color: isMyMessage
                }}
              >
                {new Date(message?.createdAt)
                  ?.toLocaleTimeString()
                  ?.split(":")
                  ?.slice(0, -1)
                  ?.join(":")}
              </Text>
            </View>
          </SquircleView>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            marginLeft: 12,
            marginRight: 12,
          }}
        >
          {!isMyMessage && message.createdBy?.name && (
            <Text
              style={{
                fontSize: 11,
                opacity: 0.7,
                color: isMyMessage
              }}
            >
              {message.createdBy.name}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
