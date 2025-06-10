// src/hooks/useGetJoinedGroupsByPhone.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useGetJoinedGroupsByPhone = (phoneNumber) => {
  const [apiGroups, setApiGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("authToken");
        if (!phoneNumber) {
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "http://192.168.29.75:3000/GetGroupsByPhone",
          { phoneNumber },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setApiGroups(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [phoneNumber]);

  return { apiGroups, loading, error };
};

export default useGetJoinedGroupsByPhone;
