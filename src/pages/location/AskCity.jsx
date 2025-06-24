import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "../../../themeContext";

const AskCity = ({ route }) => {
  const { theme } = useAppTheme();
  const { locationInfo } = route.params;
  const navigation = useNavigation();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isStateFound, setIsStateFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedLocation = useSelector((state) => state.location.selectedLocation);

  // Fetch all Indian states (ADM1)
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(
          "http://api.geonames.org/searchJSON?country=IN&featureClass=A&featureCode=ADM1&maxRows=1000&username=gummadicharan37"
        );
        const data = await res.json();
        setStates(data.geonames || []);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities of a matched state
  const fetchCities = async (stateId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=gummadicharan37`
      );
      const data = await res.json();
      setCities(data.geonames || []);
      setFilteredCities(data.geonames || []);
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoading(false);
    }
  };

  // Match state and load cities
  useEffect(() => {
    if (!states.length || !locationInfo) return;

    const stateName = locationInfo.toLowerCase();
    const match = states.find((s) => s.name.toLowerCase() === stateName);

    if (match) {
      setIsStateFound(true);
      fetchCities(match.geonameId);
    } else {
      setIsStateFound(false);
      setLoading(false);
    }
  }, [states, locationInfo]);

  // Search filter
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

  const handleCancelSearch = () => navigation.goBack();

  const normalize = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <View
      style={{
        flex: 1,padding:20,
        backgroundColor: theme.BackGround,
      }}
    >
      {/* 🔍 Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.LineColor,
            borderRadius: 20,
            paddingHorizontal: 10,
            opacity: 0.6,
          }}
        >
          <Feather name="search" size={20} color={theme.Icon} />
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              fontSize: 16,
              color: theme.ModeText1,
            }}
            placeholder="Search for City"
            placeholderTextColor={theme.ModeText3}
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity onPress={handleCancelSearch}>
          <Text style={{ marginLeft: 10, color: theme.ModeText1, fontSize: 16 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔄 Loading */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.Icon} />
          <Text style={{ marginTop: 12, color: theme.ModeText3 }}>
            Fetching cities...
          </Text>
        </View>
      ) : !isStateFound ? (
        <Text style={{ fontSize: 18, color: theme.ModeText1, marginTop: 20 }}>
          ⚠️ State not found in the list
        </Text>
      ) : filteredCities.length === 0 ? (
        <Text style={{ fontSize: 18, color: theme.ModeText1, marginTop: 20 }}>
          😕 No cities found for this state
        </Text>
      ) : (
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item.geonameId.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                const locationInfo = {
                  state: normalize(item.adminName1),
                  city: normalize(item.toponymName),
                };
                navigation.navigate("GroupSelection", { locationInfo });
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: index !== filteredCities.length - 1 ? 1 : 0,
                borderBottomColor: theme.LineColor,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: theme.BackGround,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Text style={{ paddingBottom: 5 }}>🇮🇳</Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  color: theme.ModeText1,
                }}
              >
                {item.name}
              </Text>
              <Feather name="chevron-right" size={22} color={theme.Icon} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AskCity;
