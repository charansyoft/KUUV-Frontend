import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const leaveGroup = async ({ phoneNumber, groupId }) => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");

  const response = await fetch("http://localhost:3000/groups/leave", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phoneNumber, groupId }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to leave group");
  }

  return data;
};

export const useLeaveGroupMutation = () => {
  return useMutation({
    mutationFn: leaveGroup,
  });
};
