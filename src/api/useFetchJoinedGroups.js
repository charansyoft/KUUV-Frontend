// api/useFetchJoinedGroups.js

import { useQuery } from "react-query";  // Import useQuery from react-query
import axios from "axios";  // Adjust axios instance import

// Function to fetch joined groups from the backend
const fetchJoinedGroups = async () => {
  try {
    const response = await axios.get("/groups");  // API call to fetch groups
    return response.data;  // Assuming the groups data is in the 'data' field
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Failed to fetch groups");
  }
};

const useFetchJoinedGroups = () => {
  return useQuery("joinedGroups", fetchJoinedGroups, {
    retry: 2,  // Retry up to 2 times if the request fails
    refetchOnWindowFocus: false,  // Avoid refetch on window focus
    staleTime: 1000 * 60 * 5,  // Fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Cache for 10 minutes
    onError: (error) => {
      console.error("Error in fetching groups:", error.message);
    },
    onSuccess: (data) => {
      console.log("Fetched groups successfully:", data);
    },
  });
};

export default useFetchJoinedGroups;
