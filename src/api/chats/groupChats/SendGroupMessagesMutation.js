// api/chats/groupChats/SendGroupMessagesMutation.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Direct import of AsyncStorage
import { API_URL } from '../../../config'; // You can set your API base URL here.

// Helper function to get auth token from AsyncStorage directly
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error("Error fetching token: ", error);
    return null;
  }
};

const sendGroupMessagesMutation = async (groupId, messageText) => {
  try {
    const authToken = await getAuthToken(); // Get the token from AsyncStorage.

    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      `${API_URL}/groups/${groupId}/messages`,
      { payload: { text: messageText } },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending message: ", error.response || error);
    throw new Error("Failed to send message");
  }
};

export default sendGroupMessagesMutation;
