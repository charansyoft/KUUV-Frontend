import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import useGetJoinedGroupsByPhone from "../../../api/home/useGetJoinedGroupsByPhone";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "../../../../themeContext";
export default function JoinedGroupsList({ searchText }) {
  const navigation = useNavigation();
  const phoneNumber = useSelector((state) => state.user.phone);
  const { apiGroups, loading, error } = useGetJoinedGroupsByPhone(phoneNumber);
  const {theme} = useAppTheme();
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
  <View style={{ padding: 15, backgroundColor: theme.BackGround }}>
    {/* Commenting ScrollView temporarily */}
    {/* <ScrollView> */}
      {filteredApiGroups.map((group) => (
        <TouchableOpacity
          key={group._id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.BackGround,
            borderRadius: 20,
            padding: 12,
            borderWidth: 0.5,
            borderColor: theme.LineColor,
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
                color:theme.ModeText1,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {group.name}
            </Text>
            <Text
              style={{
                color: theme.ModeText3,
                fontSize: 14,
                marginTop: 4,
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
            color={theme.Icon}
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ))}
    {/* </ScrollView> */}
  </View>
);

}
