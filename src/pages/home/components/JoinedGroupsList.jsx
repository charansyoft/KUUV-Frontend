import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import useGetJoinedGroupsByPhone from "../../../api/home/useGetJoinedGroupsByPhone";
import { useNavigation } from "@react-navigation/native";

export default function JoinedGroupsList({ searchText }) {
  const navigation = useNavigation();
  const phoneNumber = useSelector((state) => state.user.phone);
  const { apiGroups, loading, error } = useGetJoinedGroupsByPhone(phoneNumber);

  const filteredApiGroups = apiGroups.filter((group) =>
    group.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  console.log(
    "Filtered groups:",
    filteredApiGroups.map((g) => g.name)
  );

  if (loading) {
    return <Text style={{ padding: 15, color: "#000" }}>Loading...</Text>;
  }

  if (error) {
    return (
      <Text style={{ padding: 15, color: "#000"}}>Error: {error}</Text>
    );
  }

return (
  <View style={{ padding: 15, backgroundColor: "#000" }}>
    {/* Commenting ScrollView temporarily */}
    {/* <ScrollView> */}
      {filteredApiGroups.map((group) => (
        <TouchableOpacity
          key={group._id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.14)",
            borderRadius: 20,
            padding: 12,
            borderWidth: 0.5,
            borderColor: "#000",
            marginBottom: 10,
          }}
          onPress={() => {
            navigation.navigate("chats", {
              screen: "GroupChat",
              params: { GroupId: group._id },
            });
          }}
        >
          <Image
            source={{
              uri:
                group.image ||
                "https://via.placeholder.com/60x60.png?text=Group",
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {group.name}
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 14,
                marginTop: 4,
                opacity: 0.8,
              }}
            >
              {group.joinedUsers?.length > 10
                ? "10+ Joined"
                : `${group.joinedUsers?.length ?? 0} Joined`}
            </Text>
          </View>

          <Icon
            name="chevron-right"
            size={28}
            color={"#000"}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ))}
    {/* </ScrollView> */}
  </View>
);

}
