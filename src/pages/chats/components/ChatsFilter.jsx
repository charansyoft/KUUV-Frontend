import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppTheme } from "../../../../themeContext";

export default function ChatsFilter({ setActiveFilter }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { theme } = useAppTheme();

  const handleChipPress = (chip) => {
    console.log(`Selected filter: ${chip}`);
    setSelectedFilter(chip);
    setActiveFilter(chip);
  };

  const chipStyle = (chip) => ({
    marginRight: 15,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: selectedFilter === chip ? theme.SpecialBackGround : "#ccc",
    backgroundColor: selectedFilter === chip ? theme.SpecialBackGround : "transparent",
    alignItems: "center",
  });

  const textStyle = (chip) => ({
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 5,
    color: selectedFilter === chip ? "#000" : theme.Icon,
  });

  const iconColor = (chip) =>
    selectedFilter === chip ? "#000" : theme.Icon;

  return (
    <View
      style={{
        backgroundColor: theme.BackGround,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 14,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* All */}
        <TouchableOpacity onPress={() => handleChipPress("All")}>
          <View style={chipStyle("All")}>
            <Ionicons name="star-outline" size={18} color={iconColor("All")} />
            <Text style={textStyle("All")}>All</Text>
          </View>
        </TouchableOpacity>

        {/* Fav */}
        <TouchableOpacity onPress={() => handleChipPress("Fav")}>
          <View style={chipStyle("Fav")}>
            <Ionicons name="heart-outline" size={18} color={iconColor("Fav")} />
            <Text style={textStyle("Fav")}>Fav</Text>
          </View>
        </TouchableOpacity>

        {/* Important */}
        <TouchableOpacity onPress={() => handleChipPress("Important")}>
          <View style={chipStyle("Important")}>
            <Ionicons
              name="alert-circle-outline"
              size={18}
              color={iconColor("Important")}
            />
            <Text style={textStyle("Important")}>Important</Text>
          </View>
        </TouchableOpacity>

        {/* Unread */}
        <TouchableOpacity onPress={() => handleChipPress("Unread")}>
          <View style={chipStyle("Unread")}>
            <Ionicons
              name="ellipse-outline"
              size={18}
              color={iconColor("Unread")}
            />
            <Text style={textStyle("Unread")}>Unread</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
