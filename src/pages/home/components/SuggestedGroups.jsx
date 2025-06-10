import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import useGetGroupsByCity from "../../../api/home/useGetGroupsByCity";
import { useNavigation } from "@react-navigation/native"; // ✅ ADD THIS
import { useAppTheme } from "../../../../themeContext";
export default function SuggestedGroups() {
  const navigation = useNavigation(); // ✅ ADD THIS
  const { theme }= useAppTheme();
  const addresses = useSelector(
    (state) => state.userSelectedAddress?.addresses || []
  );
  const phone = useSelector((state) => state.user.phone);
  const city = addresses[0]?.city || "";

  const {
    data: groups = [],
    isLoading,
    error,
  } = useGetGroupsByCity(city, phone);

  const renderSuggestedGroup = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 140,
        marginRight: 15,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 0.5,
        backgroundColor: theme.BackGround,
        borderColor:theme.LineColor,
      }}
      onPress={() => {
        // console.log("ITEMMMMMM", item.id);
        // console.log("ITEMMMMMMM item._id",item)
        navigation.navigate("chats", {
          screen: "GroupChat",
          params: { GroupId: item.id },
        });
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 100 }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "600", color: theme.ModeText1 }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 2,
            color: theme.ModeText3,
          }}
        >
          {item.members}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading)
    return (
      <Text style={{ color: theme.ModeText1, marginLeft: 15 }}>Loading...</Text>
    );
  if (error)
    return (
      <Text style={{ color:  theme.ModeText1, marginLeft: 15 }}>
        Error loading groups
      </Text>
    );

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          marginTop: 5,
          marginBottom: 10,
          marginLeft: 15,
          color:  theme.ModeText1,
        }}
      >
        Suggested Groups
      </Text>
      <FlatList
        horizontal
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSuggestedGroup}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, paddingLeft: 15 }}
      />
    </View>
  );
}
