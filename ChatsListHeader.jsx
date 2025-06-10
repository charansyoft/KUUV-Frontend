import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatsListHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* Chevron Back Icon */}
      <Ionicons name="chevron-back" size={28} color="#fff" style={styles.backIcon} />

      {/* Header Text */}
      <Text style={styles.headerText}>Chats List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#1e1e1e', // Your preferred background color
  },
  backIcon: {
    marginRight: 10, // Space between icon and text
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White color for the header text
  },
});
