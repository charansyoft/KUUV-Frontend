import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFetchGroupsMutation(locationInfo, phone) {
  const [fetchedGroups, setFetchedGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!locationInfo?.city) return;

      try {
        setLoading(true);
        const authToken = await AsyncStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token found");
          setLoading(false);
          return;
        }

        const city = locationInfo.city;

        const response = await axios.get(
          "http://192.168.29.75:3000/categories",
          {
            params: { location: city, phone: phone },
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setUserId(response.data.data.userId);
        console.log("Groups with location :", response.data.data.categories);
        setFetchedGroups(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [locationInfo, phone]);

  return { fetchedGroups, loading, userId };
}
