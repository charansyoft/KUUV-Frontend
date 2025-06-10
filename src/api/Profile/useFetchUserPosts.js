import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFetchUserPosts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const response = await fetch("http://localhost:3000/GetUserPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include token in header
        },
      });

      if (!response.ok) throw new Error("Network response not ok");

      const json = await response.json();
      setData(json.data || json); // adjust if your API returns data in .data
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return { data, loading, error, refetch: fetchUserPosts };
}
