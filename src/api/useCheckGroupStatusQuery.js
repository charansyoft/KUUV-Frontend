import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchGroupStatus = async ({ phoneNumber, groupName }) => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");

  const response = await fetch("http://localhost:3000/groups/checkStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phoneNumber, name: groupName }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Failed to fetch group status");
  }

  return await response.json();
};

export const useCheckGroupStatusQuery = ({ phoneNumber, groupName }) => {
  return useQuery({
    queryKey: ["groupStatus", phoneNumber, groupName],
    queryFn: () => fetchGroupStatus({ phoneNumber, groupName }),
    enabled: !!phoneNumber && !!groupName,
  });
};
