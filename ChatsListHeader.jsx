import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from './themeContext';

export default function ChatsListHeader() {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: theme.BackGround , // fallback if undefined
      }}
    >
      <Ionicons
        name="chevron-back"
        size={28}
        color={theme.Icon}
        style={{ marginRight: 10 }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.ModeText1,
        }}
      >
        Chats List
      </Text>
    </View>
  );
}
