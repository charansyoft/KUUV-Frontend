import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const leaveGroup = async ({ groupId }) => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('No token found');

  const res = await axios.post(
    'http://192.168.29.75:3000/LeaveGroup',
    { groupId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const useLeaveGroupMutation = () => {
  return useMutation(leaveGroup);
};
