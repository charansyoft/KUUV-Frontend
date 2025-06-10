import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const fetchNotifications = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) throw new Error("Auth token not found");

    const response = await axios.get("http://192.168.29.75:3000/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    console.log("Raw response.data:", response.data);
    return response.data || [];
  } catch (err) {
    console.error("fetchNotifications error:", err);
    throw err; // important to throw to let react-query know
  }
};



const useFetchNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchOnMount: true, // auto-fetch when component remounts
    refetchOnWindowFocus: false, // mobile apps often don't refetch on window focus
  });
};

export default useFetchNotifications;
