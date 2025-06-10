// hooks/useGetGroupDetailsByGroupId.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const useGetGroupDetailsByGroupId = () => {
  // Retrieve the phone number from the Redux store
  // const phone = useSelector((state) => state.user.phone);

  // Use React Query's useMutation to handle the API call
  return useMutation({
    mutationFn: async ({ GroupId }) => {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");

      // Send the POST request with the groupId and phone number in the request body
const response = await axios.post(
  `http://192.168.29.75:3000/groups/${GroupId}`,
  {}, // No request body
  {
    headers: {
      Authorization: `Bearer ${token}`, // Include the authorization token in the request headers
    },
  }
);


      // Return the response data
         console.log("📦 GROUP DETAILS RESPONSE from HEADER:", response.data); // ✅ Log before return
      return response.data;
    },
  });
};
