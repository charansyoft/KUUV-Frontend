// src/hooks/useGetJoinedGroupsByPhone.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../../../config";

/**
 * Custom hook to fetch joined groups using phone number and auth token.
 * @param {string} phoneNumber - User's phone number.
 * @param {number} refreshKey - Optional key to re-trigger fetch.
 */
const useGetJoinedGroupsByPhone = (phoneNumber, refreshKey = 0) => {
  const [apiGroups, setApiGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);

        if (!phoneNumber) {
          setLoading(false);
          return;
        }

        const token = await AsyncStorage.getItem("authToken");

        const response = await axios.post(
          `${BASE_URL}/GetGroupsByPhone`,
          { phoneNumber },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApiGroups(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching groups");
        setApiGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [phoneNumber, refreshKey]); // Re-fetch on phone or refreshKey change

  return { apiGroups, loading, error };
};

export default useGetJoinedGroupsByPhone;
