import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { useGetGroupDetailsByGroupId } from '../../api/chats/groupChats/getGroupDetailsByGroupIdMutation';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { useLeaveGroupMutation } from '../../api/chats/groupChats/useLeaveGroupMutation';
import { useAppTheme } from '../../../themeContext';
export default function GroupChatHeader({ GroupId }) {
  const { mutate, data, isLoading, isError, error } = useGetGroupDetailsByGroupId();
  const phone = useSelector((state) => state.user.phone);
  const [showModal, setShowModal] = useState(false);
const { mutate: leaveGroup, isLoading: isLeaving } = useLeaveGroupMutation();
  const { theme } = useAppTheme();
  useEffect(() => {
    if (GroupId) {
      mutate({ GroupId });
    }
  }, [GroupId]);

  if (isLoading) {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator color={"#000"} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'red' }}>Error: {error?.message}</Text>
      </View>
    );
  }

  if (!data?.data) return null;

  const group = data.data;
  const isJoined = group?.joinedUsers?.some((user) => user.phone === phone);

const handleConfirmLeave = () => {
  setShowModal(false);

  leaveGroup(
    { groupId: GroupId },
    {
      onSuccess: (data) => {
        Alert.alert('Success', 'You left the group successfully.');
        // Optional: Navigate or refresh
      },
      onError: (error) => {
        Alert.alert('Error', error.message || 'Failed to leave group.');
      },
    }
  );
};

  return (
    <View style={{ backgroundColor:theme.BackGround }}>
      <View
        style={{
          margin: 15,
          marginTop: 50,
          padding: 10,
          borderWidth: 1,
          borderRadius: 15,
          borderColor: theme.LineColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Group Info */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {group?.image ? (
            <Image
              source={{ uri: group.image }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                marginRight: 12,
              }}
            />
          ) : (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 18, color: "#000" }}>?</Text>
            </View>
          )}

          <View style={{ flexShrink: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.ModeText1,
                marginBottom: 2,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {group?.name || 'Group'}
            </Text>

            <Text style={{ fontSize: 13, color:theme.ModeText1 }}>
              {group?.location} • {group?.joinedUsers?.length || 0} members
            </Text>
          </View>
        </View>

        {/* Right Side Buttons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* {!isJoined && (
            <TouchableOpacity
              onPress={() => console.log('Join group clicked')}
              style={{
                backgroundColor: '#B0B5FF',
                padding: 8,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <MaterialIcons name="add" size={25} color="black" />
            </TouchableOpacity>
          )} */}

          {/* Exit Button */}
          {isJoined && (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                backgroundColor: theme.Exit,
                padding: 8,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="exit-to-app" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Leave Group Modal */}
<Modal transparent visible={showModal} animationType="fade">
  <View
    style={{
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 10,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Exit Group
      </Text>

      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 8 }}>
        Are you sure you want to exit the group "{group.name}"?
      </Text>

      {/* Info Message */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#E6ECFF', // light blue background
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 10,
          marginBottom: 20,
          alignSelf: 'stretch',
        }}
      >
        <MaterialIcons name="info-outline" size={20} color="#4B6FFF" style={{ marginRight: 8 }} />
        <Text style={{ color: '#4B6FFF', fontSize: 14, flex: 1 }}>
          Leaving the group will delete all messages and data.
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Pressable
          onPress={() => setShowModal(false)}
          style={{
            flex: 1,
            marginRight: 10,
            padding: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.LineColor,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color:theme.ModeText1 }}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleConfirmLeave}
          style={{
            flex: 1,
            marginLeft: 10,
            padding: 12,
            borderRadius: 12,
            backgroundColor: '#FF4D4D',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: 'white' }}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
}
