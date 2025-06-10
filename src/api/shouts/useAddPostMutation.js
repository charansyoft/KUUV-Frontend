import { useMutation } from "@tanstack/react-query"; // Import TanStack Query
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mutation function to create a new post
const addPost = async (postData) => {
  // Retrieve token from AsyncStorage
  const token = await AsyncStorage.getItem("authToken");

  // If no token is found, throw an error
  if (!token) {
    throw new Error("No token found!");
  }

  // Send a POST request to the server to create a new post
  const response = await axios.post("http://192.168.29.75:3000/posts", postData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach the token in headers
    },
  });

  // Return the response data (post data) if successful
  return response.data;
};

// Custom hook to handle adding a post using useMutation
const useAddPostMutation = () => {
  return useMutation({
    mutationFn: addPost, // The function that handles the mutation
    onSuccess: (data) => {
      // Optional: handle successful post creation
      console.log('Post created successfully:', data);
    },
    onError: (error) => {
      // Optional: handle error during post creation
      console.error('Error creating post:', error.message);
    },
  });
};

export default useAddPostMutation;
