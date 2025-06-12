// src/api/useGroupPostExpressInterest.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../../config";

const expressInterest = async (post) => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");

  const response = await axios.post(
    `${BASE_URL}/GroupPostExpressInterest`,
    {
      postId: post._id,
      createdBy: post.createdBy._id,
      groupId: post.group,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useGroupPostExpressInterest = () => {
  return useMutation({
    mutationFn: expressInterest,
  });
};
