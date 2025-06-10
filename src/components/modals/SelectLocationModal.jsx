import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, View, ScrollView, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import useGetLocationsQuery from "../../api/useGetLocationsQuery";
import TextField from "../../components/forms/TextField";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { handleLocationSelect } from "../../redux/locationSlice";

export default function SelectLocationModal({ open, handleClose }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%", "50%"], []);

  const [searchText, setSearchText] = useState("");

  const getLocationsQuery = useGetLocationsQuery({ q: searchText });
  const locations = getLocationsQuery?.data?.data ?? [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (open && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [open]);

  useEffect(() => {
    getLocationsQuery.refetch();
  }, [searchText]);

  const handleSelectLocation = (locationName) => {
    dispatch(handleLocationSelect(locationName));
    handleClose(); // close the modal after selection
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <GestureHandlerRootView
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onClose={handleClose}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "#111" }}
          handleIndicatorStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.61)",
            width: 40,
            height: 4,
            borderRadius: 2,
          }}
        >
          <BottomSheetView style={{ flex: 1, backgroundColor: "#111" }}>
            {/* Entire Scrollable Content */}
            <ScrollView
              contentContainerStyle={{ padding: 24 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Search Field */}
              <View
                style={{
                  marginBottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                }}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color="rgba(255,255,255,0.5)"
                  style={{ marginRight: 8 }}
                />
                <TextField
                  style={{
                    flex: 1,
                    color: "#fff",
                    fontSize: 18,
                    paddingVertical: 12,
                    paddingLeft: 0,
                  }}
                  placeholder="Search location..."
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                />
              </View>

              {/* Location List */}
              {locations?.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectLocation(location?.name)}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    backgroundColor: "#222",
                    borderRadius: 14,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Text style={{ color: "#ffffff", fontSize: 16 }}>
                    {location?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </Modal>
  );
}
