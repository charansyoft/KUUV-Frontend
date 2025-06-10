import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatsSearch({ searchText, setSearchText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none" // Optional: To prevent automatic capitalization
        underlineColorAndroid="transparent" // Fix for Android focus color
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(60, 59, 59, 0.82)',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    borderWidth: 0, // Ensure no border is applied
    outlineStyle: 'none', // Prevent the outline style
  },
});
