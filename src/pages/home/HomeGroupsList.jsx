import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Page from "../../components/Page";
import SuggestedGroups from "./components/SuggestedGroups";
import JoinedGroupsList from "./components/JoinedGroupsList";
import SearchBar from "./components/Searchbar";

export default function HomeGroupsList() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <Page>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 100 }} // bottom padding so content doesn't hide behind footer
        >
          <SearchBar
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
          />

          <JoinedGroupsList searchText={searchText} />
          <SuggestedGroups />
        </ScrollView>

        {/* Sticky footer */}
        <View
          style={{
            position: "absolute",
            bottom: 12,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            paddingVertical: 0,
            // borderTopWidth: 1,
            // borderTopColor: "#ddd",
          }}
        >
          <MaterialIcons
            name="lock"
            size={16}
            color="rgba(255, 255, 255, 0.60)"
          />
          <View style={{ marginLeft: 5 }}>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.60)",
                fontSize: 12.5,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              Your information is{" "}
              {/* <Text style={{ color: "rgb(0, 255, 8)", fontWeight: "bold" }}>safe and secure</Text>{" "} */}
              <Text style={{ color: "rgb(143, 151, 255)", fontWeight: "bold" }}>
                safe and secure
              </Text>{" "}
              {/* <Text style={{ color: "#4caf50", fontWeight: "bold" }}>secure</Text>{" "} */}
              with us
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Page>
  );
}
