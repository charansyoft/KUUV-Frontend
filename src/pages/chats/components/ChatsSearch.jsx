import React from 'react';
import { View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../../../themeContext';

export default function ChatsSearch({ searchText, setSearchText }) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.BackGround,
        borderWidth:1,
        borderColor:theme.LineColor,
        // opacity:0.35,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Ionicons
        name="search"
        size={20}
        color={theme.Icon}
        style={{ marginRight: 8, opacity:0.4 }}
      />
      <TextInput
        style={{
          flex: 1,
          color: theme.ModeText1,
          fontSize: 16,
          paddingVertical: 10,
        }}
        placeholder="Search by name"
        placeholderTextColor={theme.ModeText3}
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />
    </View>
  );
}
