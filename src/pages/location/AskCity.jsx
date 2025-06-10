import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"; // Using Feather instead of MUI icons for React Native

const AskCity = ({ route }) => {
  const { locationInfo } = route.params;
  const navigation = useNavigation();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isStateFound, setIsStateFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "http://api.geonames.org/searchJSON?country=IN&featureClass=A&featureCode=ADM1&maxRows=1000&username=gummadicharan37 "
        );
        const data = await response.json();
        setStates(data.geonames || []);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = async (stateId) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=gummadicharan37 `
      );
      const data = await response.json();
      setCities(data.geonames || []);
      setFilteredCities(data.geonames || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const stateName = locationInfo?.toLowerCase();
    const matchedState = states.find(
      (state) => state.name.toLowerCase() === stateName
    );
    if (matchedState) {
      fetchCities(matchedState.geonameId);
      setIsStateFound(true);
    } else {
      setIsStateFound(false);
    }
  }, [states, locationInfo]);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = cities.filter((city) =>
        city.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  };

  const handleCancelSearch = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        paddingVertical:50,
        paddingBottom:60,
        backgroundColor: "#000",
      }}
    >
      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          backgroundColor:"#000",
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 20,
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
            opacity: 0.6,
          }}
        >
          <Feather name="search" size={20} color={"#000"} />
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              color: "#fff",
              fontSize: 16,
              outlineStyle: "none",
              outlineColor: "transparent",
              outlineWidth: 0,
            }}
            placeholder="Search for City"
            placeholderTextColor="#ccc"
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={handleCancelSearch}>
          <Text style={{ marginLeft: 10, color: "#000", fontSize: 16 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cities list */}
      {isStateFound ? (
        filteredCities.length > 0 ? (
          <FlatList
            style={{ width: "100%", marginTop: 0, padding: 0 }}
            data={filteredCities}
            keyExtractor={(item) => item.geonameId.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  const normalize = (text) =>
                    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                  const locationInfo = {
                    state: normalize(item.adminName1),
                    city: normalize(item.toponymName),
                  };

                  console.log("LocationInfo:", locationInfo);
                  navigation.navigate("GroupSelection", { locationInfo });
                }}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor:"#000",
                  marginBottom: 10,
                  justifyContent: "space-between",
                  borderBottomWidth:
                    index === filteredCities.length - 1 ? 0 : 1,
                  borderBottomColor: "#000",
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginRight: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                  }}
                >
                  <Text style={{ paddingBottom: 5 }}>🇮🇳</Text>
                </View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    flex: 1,
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </Text>
                <Feather name="chevron-right" size={22} color={"#000"} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={{ fontSize: 18, color:"#000", marginTop: 20 }}>
            No cities found
          </Text>
        )
      ) : (
        <Text style={{ fontSize: 18, color: "#000", marginTop: 20 }}>
          State not found in the list
        </Text>
      )}
    </View>
  );
};

export default AskCity;
