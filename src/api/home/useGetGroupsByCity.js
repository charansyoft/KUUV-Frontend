// src/api/home/useGetGroupsByCity.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../../config';

const fetchGroupsByCity = async ({ queryKey }) => {
  const [_key, city, phone] = queryKey;

  if (!city || !phone) return [];

  const authToken = await AsyncStorage.getItem("authToken");

  const response = await axios.get(`${BASE_URL}/categories`, {
    params: { location: city, phone },
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { categories, userId } = response.data.data;

  // Filter out joined groups
  const filtered = categories.filter(
    (cat) => !cat.joinedUsers.includes(userId)
  );

  // Map to expected format
  return filtered.map((cat) => ({
    id: cat._id,
    name: cat.name,
    image: cat.image,
    members: `${cat.joinedUsers.length} members`,
  }));
};

const useGetGroupsByCity = (city, phone) => {
  return useQuery({
    queryKey: ['suggestedGroups', city, phone],
    queryFn: fetchGroupsByCity,
    enabled: !!city && !!phone,
  });
};

export default useGetGroupsByCity;
