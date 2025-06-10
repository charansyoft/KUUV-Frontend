import React from 'react';
import { View } from 'react-native';
import SearchField from '../../../components/forms/SearchField'; // Ensure this points to your actual custom TextInput

const SearchBar = ({ value = '', onChangeText, placeholder }) => {
  return (
    <View style={{ marginBottom: 5, paddingHorizontal: 15, paddingTop: 10 }}>
      <SearchField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchBar;
