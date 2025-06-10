import * as Location from "expo-location";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/appSlice";
import store from "../redux/store";

export default function useLocation() {
  const dispatch = useDispatch();

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      if (!location || !location.coords) {
        console.log("Failed to retrieve location coordinates.");
        return;
      }

      const { latitude, longitude } = location.coords;
      console.log("Current Location Coordinates:", { latitude, longitude });

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();

        if (data && data.address) {
          const {
            neighbourhood,
            suburb,
            district,
            county,
            city,
            state,
            country,
          } = data.address;

          const districtOrCounty = district || county;

          const formattedAddress = [districtOrCounty, city, state, country]
            .filter(Boolean)
            .join(", ");

          // console.log("Extracted Address:", formattedAddress);

          dispatch(setLocation(formattedAddress));

          setTimeout(() => {
            const storedLocation = store.getState().app.location;
            console.log("Stored Location in Redux:", storedLocation);
          }, 500);
        } else {
          // console.log("No address found for these coordinates.");
        }
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
      }
    };

    requestLocation();
  }, [dispatch]);

  return null;
}
