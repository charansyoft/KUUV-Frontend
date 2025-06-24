import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Keyboard,
  Animated,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import socket from "../../socket";
import Page from "../../components/Page";
import SendMessageField from "./components/SendMessageField";
import { getGroupMessagesMutation } from "../../api/chats/groupChats/getGroupMessagesMutation";
import { MaterialIcons } from "@expo/vector-icons";

const isViewable = (layoutY, scrollY, screenHeight) => {
  const buffer = 20;
  return layoutY >= scrollY - buffer && layoutY <= scrollY + screenHeight - buffer;
};

export default function GroupChat({ route }) {
  const { GroupId } = route.params;
  const phone = useSelector((state) => state.user.phone);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const [selectedMsgMeta, setSelectedMsgMeta] = useState(null);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const messageRefs = useRef({});
  const scrollY = useRef(0);
  const screenHeight = 500; // adjust based on device height

  const { mutateAsync: fetchMessages } = getGroupMessagesMutation();

  useEffect(() => {
    async function loadInitialMessages() {
      try {
        const response = await fetchMessages({ GroupId });
        const fetchedMessages = response?.data?.messages || [];
        setMessages(fetchedMessages);

        fetchedMessages.forEach((msg) => {
          if (!msg.receivedBy?.includes(phone)) {
            socket.emit("MessageReceived", {
              messageId: msg._id,
              groupId: GroupId,
            });
          }
        });
      } catch (error) {
        console.error("❌ Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialMessages();
  }, [GroupId]);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    socket.emit("registerUser", phone);
    socket.emit("JoinGroupChat", GroupId);

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);

      if (!msg.receivedBy?.includes(phone)) {
        socket.emit("MessageReceived", {
          messageId: msg._id,
          groupId: msg.group,
        });
      }
    };

    socket.on("NewGroupMessage", handleNewMessage);

    return () => {
      socket.emit("LeaveGroupChat", GroupId);
      socket.off("NewGroupMessage", handleNewMessage);
    };
  }, [GroupId, phone]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 175,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Page>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#999" />
        </View>
      ) : (
        <>
          <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 10 }}>
            <ScrollView
              onScroll={(e) => {
                const y = e.nativeEvent.contentOffset.y;
                scrollY.current = y;

                messages.forEach((msg) => {
                  const ref = messageRefs.current[msg._id];
                  if (ref) {
                    ref.measure((fx, fy, width, height, px, py) => {
                      const visible = isViewable(py, y, screenHeight);
                      if (
                        visible &&
                        !msg.readBy?.includes(phone) &&
                        msg.createdBy?.phone !== phone
                      ) {
                        socket.emit("MessageRead", {
                          messageId: msg._id,
                          groupId: GroupId,
                        });

                        setMessages((prev) =>
                          prev.map((m) =>
                            m._id === msg._id
                              ? { ...m, readBy: [...(m.readBy || []), phone] }
                              : m
                          )
                        );
                      }
                    });
                  }
                });
              }}
              scrollEventThrottle={100}
            >
              {messages.map((msg, index) => {
                const isSender = msg.createdBy?.phone === phone;
                const showProfile = !isSender && msg.createdBy?.profilePic;

                return (
                  <View
                    key={msg._id}
                    ref={(ref) => (messageRefs.current[msg._id] = ref)}
                    style={{
                      flexDirection: isSender ? "row-reverse" : "row",
                      alignItems: "flex-start",
                      marginBottom: 12,
                      paddingHorizontal: 4,
                    }}
                  >
                    {showProfile && (
                      <Image
                        source={{ uri: msg.createdBy.profilePic }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          marginRight: isSender ? 0 : 8,
                          marginLeft: isSender ? 8 : 0,
                        }}
                      />
                    )}

                    <View
                      style={{
                        maxWidth: "75%",
                        backgroundColor: isSender ? "#DCF8C6" : "#EAEAEA",
                        borderRadius: 12,
                        padding: 10,
                        alignSelf: isSender ? "flex-end" : "flex-start",
                      }}
                    >
                      {!isSender && (
                        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                          {msg.createdBy?.name || msg.createdBy?.phone || "User"}
                        </Text>
                      )}

                      {msg.type === "msg" && (
                        <>
                          <Text style={{ color: "#000", fontSize: 15 }}>{msg.Message}</Text>
                          <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 4 }}>
                            <MaterialIcons
                              name="info-outline"
                              size={20}
                              color="#888"
                              onPress={() => {
                                setSelectedMsgMeta({
                                  receivedBy: msg.receivedBy || [],
                                  readBy: msg.readBy || [],
                                });
                                setShowMetaModal(true);
                              }}
                            />
                            {isSender && (
                              <MaterialIcons
                                name="done-all"
                                size={18}
                                color={
                                  msg.readBy?.length >= 2 ? "#2196F3" : "#999"
                                }
                                style={{ marginLeft: 4 }}
                              />
                            )}
                          </View>
                        </>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <Animated.View style={{ paddingBottom: keyboardHeight }}>
            <SendMessageField GroupChatId={GroupId} />
          </Animated.View>

          <Modal visible={showMetaModal} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>📩 Message Info</Text>
                <Text style={styles.sectionTitle}>✅ Read By</Text>
                {selectedMsgMeta?.readBy?.length ? (
                  selectedMsgMeta.readBy.map((phone, idx) => (
                    <Text key={`read-${idx}`} style={styles.userItem}>{phone}</Text>
                  ))
                ) : (
                  <Text style={styles.userItem}>No one has read this yet.</Text>
                )}
                <Text style={styles.sectionTitle}>📥 Received By</Text>
                {selectedMsgMeta?.receivedBy?.length ? (
                  selectedMsgMeta.receivedBy.map((phone, idx) => (
                    <Text key={`recv-${idx}`} style={styles.userItem}>{phone}</Text>
                  ))
                ) : (
                  <Text style={styles.userItem}>No one has received this yet.</Text>
                )}
                <TouchableOpacity
                  onPress={() => setShowMetaModal(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  userItem: {
    paddingVertical: 4,
    paddingLeft: 8,
    fontSize: 14,
    color: "#444",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
