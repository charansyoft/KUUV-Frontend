import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.maxRedirects = 0;

const joinGroup = async ({ phoneNumber, groupId }) => {
  console.log("🔁 API CALL to /groups/join with:", { phoneNumber, groupId });

  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("🪪 Retrieved Token:", token);

    const response = await axios.post(
      "http://localhost:3000/groups/join",
      { phoneNumber, groupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ API SUCCESS:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ API ERROR:", error.message);
    throw error;
  }
};

export const useJoinGroupMutation = () => {
  return useMutation({ mutationFn: joinGroup });
};
