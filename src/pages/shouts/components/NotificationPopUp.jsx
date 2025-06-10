import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Portal, Dialog } from "react-native-paper";

export default function NotificationPopUp({
  visible,
  onDismiss,
  notif,
  onVisit,
}) {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: "#121212", borderRadius: 25 }}
      >
        <Dialog.Title style={{ color: "#B0B5FF", fontWeight: "700" }}>
          Notification Options
        </Dialog.Title>

        <Dialog.Content>
          <Text style={{ marginBottom: 10, color: "#E0E0E0" }}>
            What would you like to do?
          </Text>
          {notif && (
            <>
              <Text style={{ color: "#ffffff", marginBottom: 4 }}>
                User: {notif.fromUser.name}
              </Text>
              <Text style={{ color: "#B0B0B0" }}>Message: {notif.message}</Text>
            </>
          )}
        </Dialog.Content>

        <Dialog.Actions style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.visitButton]}
            onPress={onVisit}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: "#BB86FC" }]}>Visit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onDismiss}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: "#888" }]}>Cancel</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  visitButton: {
    backgroundColor: "rgba(187, 134, 252, 0.15)", // Slightly dull purple background
    alignSelf: "flex-start",
  },
  cancelButton: {
    backgroundColor: "rgba(136, 136, 136, 0.15)", // Slightly dull grey background
    alignSelf: "flex-end",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 14,
  },
});
