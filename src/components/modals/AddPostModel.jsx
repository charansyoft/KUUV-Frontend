import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAddPostMutation from "../../api/shouts/useAddPostMutation"; // Import the custom hook

export default function AddPostModel({ open, handleClose }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "50%"], []);

  const [text, setText] = useState("");
  const [imageLink, setImageLink] = useState("");

  // Using the mutation hook
  const {
    mutateAsync: addPost,
    isLoading,
    isError,
    error,
    reset,
  } = useAddPostMutation();

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 100); // slight delay to ensure ref is available
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handlePost = async () => {
    if (text.trim() === "") {
      console.error("Text cannot be empty");
      return;
    }

    try {
      // Prepare post data
      const postData = {
        text,
        media: imageLink ? [imageLink] : [], // Only add image if there's a link
      };

      // Call the mutation function to create the post
      await addPost(postData);

      handleClose(); // Close the modal after the post is successfully created
      reset(); // Reset any mutation state for next use
    } catch (error) {
      console.error(
        "Error creating post:",
        error.message || error.response?.data
      );
    }
  };

  return (
    <Modal visible={open} transparent animationType="fade">
      {open && (
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
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: 40,
              height: 4,
              borderRadius: 2,
            }}
          >
            <BottomSheetView
              style={{
                flex: 1,
                backgroundColor: "#111",
                padding: 20,
                justifyContent: "center",
              }}
            >
              {/* Text Input */}
              <Text style={{ color: "#ccc", marginBottom: 5 }}>Text</Text>
              <TextInput
                placeholder="Write something..."
                placeholderTextColor="#777"
                value={text}
                onChangeText={setText}
                style={{
                  borderWidth: 1,
                  borderColor: "#444",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 15,
                  color: "#fff",
                }}
              />

              {/* Image Link Input */}
              <Text style={{ color: "#ccc", marginBottom: 5 }}>Image Link</Text>
              <TextInput
                placeholder="Paste image link..."
                placeholderTextColor="#777"
                value={imageLink}
                onChangeText={setImageLink}
                style={{
                  borderWidth: 1,
                  borderColor: "#444",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 20,
                  color: "#fff",
                }}
              />

              {/* Post Button */}
              <TouchableOpacity
                onPress={handlePost}
                style={{
                  backgroundColor: "#B0B5FF",
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                disabled={isLoading}
              >
                <Text style={{ color: "#000", fontWeight: "bold" }}>
                  {isLoading ? "Posting..." : "Post"}
                </Text>
              </TouchableOpacity>

              {/* Show error message if any */}
              {isError && (
                <Text style={{ color: "red", marginTop: 10 }}>
                  {error?.message ||
                    "An error occurred while creating the post."}
                </Text>
              )}
            </BottomSheetView>
          </BottomSheet>
        </GestureHandlerRootView>
      )}
    </Modal>
  );
}
