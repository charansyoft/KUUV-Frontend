import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import Page from "../src/components/Page";
import SendMessageField from "../src/pages/chats/components/SendMessageField";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Chats({ route }) {
  const messagesEndRef = useRef(null);
  const navigation = useNavigation(); // Hook to access navigation

  const getFormattedDate = (date) => {
    const today = new Date();
    const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  const getRandomColor = ["#a8ad90", "#95c7c4", "#84a9e0", "#7c82d6", "#c79bc5", "#a997c4"];

  const getRandomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  };

  const groupData = {
    data: [
      {
        type: "post",
        profileImage:
          "https://img.freepik.com/premium-photo/realistic-3d-cartoon-character-with-glasses-beard_899449-25784.jpg",
        name: "John Doe",
        time: "2025-04-25T12:30:00Z",
        postImage:
          "https://static.wixstatic.com/media/a04a4f_284df3b841374842945db7b44ae7f888~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a04a4f_284df3b841374842945db7b44ae7f888~mv2.jpga",
        price: "50.00",
        title: "Vintage Car for Sale",
        description: "A well-maintained vintage car. Must see!",
        interestedCount: 12,
        userType: "Sender",
      },
      {
        type: "msg",
        profileImage:
          "https://img.freepik.com/premium-photo/3d-pixar-character-ma-with-short-beard-smaller-eyes-glasses_899449-65735.jpg",
        name: "Alice Smith",
        time: "2025-04-25T13:00:00Z",
        content:
          "Hey, how are you doing? Can you send more details about the car?",
        userType: "Receiver",
      },
      {
        type: "msg",
        profileImage:
          "https://img.freepik.com/premium-photo/adventurethemed-3d-pixar-character-with-glasses-beard_899449-58433.jpg",
        name: "Bob Lee",
        time: "2025-04-25T14:30:00Z",
        content: "Got it! I'll message you soon to confirm.",
        userType: "Sender",
      },
    ],
  };

  return (
    <Page>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#000000" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 5,
              backgroundColor: "#000000",
            }}
          >
            {groupData?.data?.length > 0 &&
              groupData.data.map((item, index) => {
                const isSender = item.userType === "Sender";
                const alignStyle = {
                  alignSelf: isSender ? "flex-start" : "flex-end",
                };

                if (item.type === "post") {
                  return (
                    <View
                      key={index}
                      style={{
                        ...alignStyle,
                        width: "90%",
                        backgroundColor: "#000",
                        marginVertical: 0,
                        padding: 15,
                        borderRadius: 15,
                      }}
                    >
                      <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Image
                          source={{ uri: item.profileImage }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginRight: 10,
                          }}
                        />
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#000",
                              fontSize: 16,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              color: "#000",
                              fontSize: 14,
                              opacity: 0.7,
                            }}
                          >
                            {getFormattedDate(new Date(item.time))}
                          </Text>
                        </View>
                      </View>

                      {item.postImage && (
                        <Image
                          source={{ uri: item.postImage }}
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 10,
                            marginBottom: 10,
                          }}
                        />
                      )}

                      <Text
                        style={{
                          fontSize: 14,
                          color: "#FFFFFF",
                          marginBottom: 10,
                        }}
                      >
                        ${item.price}
                      </Text>

                      <Text
                        style={{
                          fontSize: 14,
                          color: "#000",
                          marginBottom: 5,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#000",
                          marginBottom: 5,
                        }}
                      >
                        {item.description}
                      </Text>

                      {/* Buttons */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 10,
                          borderBottomWidth: 1,
                          paddingBottom: 16,
                          borderColor:"#000",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            backgroundColor: "#B0B5FF",
                            paddingVertical: 10,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: "#FFFFFF",
                            marginRight: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#000000",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            Express Interest
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            flex: 1,
                            backgroundColor: "#000000",
                            paddingVertical: 10,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: "#FFFFFF",
                            marginLeft: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            Share Now
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Footer: Circles + Text + Icon */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            position: "relative",
                            marginRight: 10,
                            width: 60,
                            height: 24,
                          }}
                        >
                          {Array.from({
                            length: Math.min(item.interestedCount, 4),
                          }).map((_, idx) => (
                            <View
                              key={idx}
                              style={{
                                position: "absolute",
                                left: idx * 15,
                                zIndex: 10 - idx,
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: getRandomColor[idx % getRandomColor.length],
                                  borderRadius: 12,
                                  width: 24,
                                  height: 24,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderWidth: 1,
                                  borderColor: "#FFFFFF",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#000000",
                                    fontWeight: "600",
                                    fontSize: 12,
                                  }}
                                >
                                  {getRandomLetter()}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>

                        <Text
                          style={{
                            fontSize: 14,
                            color: "#000",
                            opacity: 0.7,
                            marginLeft: 10,
                          }}
                        >
                          {item.interestedCount} People Interested
                        </Text>

                        <ChevronRightIcon
                          style={{ fontSize: 20, color: "#FFFFFF", opacity: 0.7 }}
                        />
                      </View>
                    </View>
                  );
                }

                if (item.type === "msg") {
                  return (
                    <View
                      key={index}
                      style={{
                        ...alignStyle,
                        width: "90%",
                        backgroundColor: "#000",
                        marginVertical: 0,
                        padding: 15,
                        borderRadius: 15,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("HomeGroupsList")} // Navigate on image press
                      >
                        <Image
                          source={{ uri: item.profileImage }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginRight: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
          </ScrollView>
          <SendMessageField />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Page>
  );
}
