import { useMutation } from '@tanstack/react-query'; // ✅ Use the new React Query package
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// ✅ Send Post Function
const sendPost = async ({ postData, GroupId }) => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  const formData = new FormData();
   console.log("SAAAAAAAAAAAAAAAAAAAAAA:", formData)

  formData.append('title', postData.title);
  formData.append('description', postData.description);
  formData.append('price', postData.price.toString()); // ensure string
  formData.append('duration', postData.duration);
  formData.append('GroupId', GroupId);

  if (postData.image) {
    const uri = postData.image;
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
console.log('🧾 Image:', {
  uri,
  name: filename,
  type,
});

formData.append('image', {
  uri,
  name: filename,
  type,
});

  }
  const response = await axios.post(
    'http://localhost:3000/posttts', // 🔁 Replace with your actual backend IP (for React Native)
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

// ✅ Mutation Hook
export const useSendPostMutation = () => {
  return useMutation({
    mutationFn: sendPost,
  });
};
