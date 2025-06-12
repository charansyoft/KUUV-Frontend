import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BASE_URL from "../../../config";

// Function to fetch posts from the server
const fetchPosts = async () => {
  const token = await AsyncStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found!");
  }

  const response = await axios.get(`${BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data?.data || [];
};

// Custom hook to fetch posts
const useFetchPostsQuery = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

export default useFetchPostsQuery;
