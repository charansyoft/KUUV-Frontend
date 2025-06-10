import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalChat from "../pages/chats/PersonalChat";
import GroupChat from "../pages/chats/GroupChat";
import PersonalChatHeader from "../components/header/Chats/PersonalChatHeader";
import GroupChatHeader from "../components/header/GroupChatHeader";
import ChatsListPage from "../pages/chats/ChatsListPage";
import ChatsListHeader from "../../ChatsListHeader";
import PostComposer from "../pages/chats/components/PostComposer";
import ViewProfile from "../pages/chats/components/ViewProfile";
// custom headers
const Stack = createNativeStackNavigator();

export default function ChatsStack() {
  return (
    <Stack.Navigator initialRouteName="ChatsListPage">
      
      <Stack.Screen 
        name="PostComposer"
        component={PostComposer}
        options={{
          title:"Create Post",
          headerShown:false,
        }}
      />

      <Stack.Screen
        name="ChatsListPage"
        component={ChatsListPage}
        options={{
          header: () => <ChatsListHeader />,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={({ route }) => {
          // console.log("GroupChat route object:", route);
          return {
            header: () => <GroupChatHeader GroupId={route.params.GroupId} />,
            headerShown: true,
          };
        }}
      />

      <Stack.Screen
        name="PersonalChat"
        component={PersonalChat}
        options={{
          header: () => <PersonalChatHeader />,
          headerShown: true,
        }}
      />

      <Stack.Screen name="ViewProfile" component={ViewProfile} />
    </Stack.Navigator>
  );
}
