import { View } from "react-native";
import TextMessage from "./TextMessage";

export default function Message({ message }) {
  switch (message?.type) {
    case "text":
      return <TextMessage message={message} />;
    case "system":
      return <SystemMessage message={message} />;
    default:
      return <View />;
  }
}
