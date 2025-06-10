import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChatsFilter({ setActiveFilter }) {
  // Set initial active filter to "All"
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Function to handle chip click
  const handleChipPress = (chip) => {
    console.log(`Selected filter: ${chip}`);
    setSelectedFilter(chip); // Set the clicked chip as active
    setActiveFilter(chip); // Pass the selected filter to parent
  };

  return (
    <View style={styles.container}>
      {/* Horizontal ScrollView for Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipContainer}
      >
        {/* All Chip */}
        <TouchableOpacity onPress={() => handleChipPress("All")}>
          <View
            style={[
              styles.chip,
              selectedFilter === "All" && styles.selectedChip, // Apply selected chip style
            ]}
          >
            <Ionicons
              name="star-outline"
              size={18}
              color={selectedFilter === "All" ? "#000" : "#fff"} // Change icon color if selected
            />
            <Text
              style={[
                styles.chipText,
                selectedFilter === "All" && styles.selectedText, // Apply selected text style
              ]}
            >
              All
            </Text>
          </View>
        </TouchableOpacity>

        {/* Fav Chip */}
        {/* <TouchableOpacity onPress={() => handleChipPress("Fav")}>
          <View
            style={[
              styles.chip,
              selectedFilter === "Fav" && styles.selectedChip, // Apply selected chip style
            ]}
          >
            <Ionicons
              name="heart-outline"
              size={18}
              color={selectedFilter === "Fav" ? "#000" : "#fff"} // Change icon color if selected
            />
            <Text
              style={[
                styles.chipText,
                selectedFilter === "Fav" && styles.selectedText, // Apply selected text style
              ]}
            >
              Fav
            </Text>
          </View>
        </TouchableOpacity> */}

        {/* Important Chip */}
        {/* <TouchableOpacity onPress={() => handleChipPress("Important")}>
          <View
            style={[
              styles.chip,
              selectedFilter === "Important" && styles.selectedChip, // Apply selected chip style
            ]}
          >
            <Ionicons
              name="alert-circle-outline"
              size={18}
              color={selectedFilter === "Important" ? "#000" : "#fff"} // Change icon color if selected
            />
            <Text
              style={[
                styles.chipText,
                selectedFilter === "Important" && styles.selectedText, // Apply selected text style
              ]}
            >
              Important
            </Text>
          </View>
        </TouchableOpacity> */}

        {/* Unread Chip */}
        {/* <TouchableOpacity onPress={() => handleChipPress("Unread")}>
          <View
            style={[
              styles.chip,
              selectedFilter === "Unread" && styles.selectedChip, // Apply selected chip style
            ]}
          >
            <Ionicons
              name="ellipse-outline"
              size={18}
              color={selectedFilter === "Unread" ? "#000" : "#fff"} // Change icon color if selected
            />
            <Text
              style={[
                styles.chipText,
                selectedFilter === "Unread" && styles.selectedText, // Apply selected text style
              ]}
            >
              Unread
            </Text>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000", // Dark background for the entire row
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom:14,
  },
  chipContainer: {
    flexDirection: "row",
  },
  chip: {
    marginRight: 15,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc", // Light border for the chip
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#B0B5FF", // Background color when selected
    borderColor: "#B0B5FF", // Border color when selected
  },
  chipText: {
    fontWeight:"500",
    fontSize: 14,
    color: "#fff", // Default white text for chip label
    marginLeft: 5,
  },
  selectedText: {
    fontWeight:"500",
    color: "#000", // Text color when selected
  },
});
