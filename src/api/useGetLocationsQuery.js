import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useGetLocationsQuery(params) {
  return useQuery({
    queryKey: ["useGetLocations", params?.q],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Token retrieved from AsyncStorage:", token);

      let apiUrl = "http://localhost:3000/locations";
      if (params?.q) {
        apiUrl += `?q=${encodeURIComponent(params.q)}`;
      }

      const res = await axios({
        url: apiUrl,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    ...params,
  });
}
