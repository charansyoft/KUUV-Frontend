import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAppTheme } from "../../../themeContext";
import Page from "../../components/Page";
import SuggestedGroups from "./components/SuggestedGroups";
import JoinedGroupsList from "./components/JoinedGroupsList";
import SearchBar from "./components/Searchbar";

export default function HomeGroupsList() {
  const [searchText, setSearchText] = useState("");
  const { theme } = useAppTheme();
  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <Page>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.BackGround }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }} // bottom padding so content doesn't hide behind footer
        >
          <SearchBar
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
          />

          <JoinedGroupsList searchText={searchText} />
          <SuggestedGroups />
                  {/* Sticky footer */}
        <View
          style={{
            paddingTop:8,
            paddingBottom:12,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.BackGround,
            paddingVertical: 0,
            // borderTopWidth: 1,
            // borderTopColor: "#ddd",
          }}
        >
          <MaterialIcons
            name="lock"
            size={16}
            color={theme.Icon}
          />
          <View style={{ marginLeft: 5 }}>
            <Text
              style={{
                color:theme.ModeText3,
                fontSize: 12.5,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              Your information is{" "}
              {/* <Text style={{ color: "rgb(0, 255, 8)", fontWeight: "bold" }}>safe and secure</Text>{" "} */}
              <Text style={{ color: "rgb(71, 83, 248)", fontWeight: "bold" }}>
                safe and secure
              </Text>{" "}
              {/* <Text style={{ color: "#4caf50", fontWeight: "bold" }}>secure</Text>{" "} */}
              with us
            </Text>
          </View>
        </View>
        </ScrollView>


      </SafeAreaView>
    </Page>
  );
}
