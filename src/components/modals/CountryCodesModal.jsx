import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CountryCodesModal({ open, handleClose }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  useEffect(() => {
    if (open && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [open]);

  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    setLocationText(searchText);
    // handle search
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      <GestureHandlerRootView
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onClose={handleClose}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "#111" }}
          handleIndicatorStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Light color for visibility
            width: 40,
            height: 4,
            borderRadius: 2,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 24,
              alignItems: "center",
              backgroundColor: "#111", // <-- Ensure content is black too
            }}
          ></BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </Modal>
  );
}
