import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "../../../themeContext";
import { Dialog, Portal, Button, Provider as PaperProvider } from "react-native-paper";

export default function ProfilePage() {
  const navigation = useNavigation();
  const { theme, changeTheme } = useAppTheme();
  const phone = useSelector((state) => state.user.phone);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleThemeChange = (mode) => {
    changeTheme(mode);
    hideDialog();
  };

  const handleEditProfile = () =>
    navigation.navigate("profile-my-information", { userData: phone });

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.reset({ index: 0, routes: [{ name: "auth-login-methods" }] });
  };

  const renderDivider = () => (
    <View
      style={{
        height: 1,
        opacity: 0.45,
        backgroundColor: theme.LineColor,
        marginVertical: 20,
      }}
    />
  );

  const renderOption = (icon, label, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather name={icon} size={22} style={{ color: theme.Icon }} />
        <Text
          style={{
            fontSize: 17,
            color: theme.ModeText1,
            fontFamily: "System",
            marginLeft: 15,
          }}
        >
          {label}
        </Text>
      </View>
      <Feather name="chevron-right" size={22} color={theme.Icon} />
    </TouchableOpacity>
  );

  const renderOptionsList = (options) =>
    options.map((option, index) => (
      <View key={index}>
        {index !== 0 && renderDivider()}
        {renderOption(option.icon, option.label, option.onPress)}
      </View>
    ));

  const mainOptions = [
    { icon: "user", label: "My Information", onPress: handleEditProfile },
    { icon: "calendar", label: "Bookings", onPress: () => {} },
    { icon: "briefcase", label: "My Business", onPress: () => {} },
    { icon: "sun", label: "Theme", onPress: showDialog },
    { icon: "credit-card", label: "My Credits", onPress: () => {} },
  ];

  const supportOptions = [
    { icon: "message-circle", label: "Ask Questions", onPress: () => {} },
    { icon: "help-circle", label: "Help", onPress: () => {} },
  ];

  const logoutOption = [
    { icon: "log-out", label: "Logout", onPress: handleLogout },
  ];

  return (
    <PaperProvider>
      <View style={{ backgroundColor: theme.BackGround, flex: 1 }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: theme.BackGround,
              padding: 15,
              marginHorizontal: 15,
              borderRadius: 14,
              marginTop: 10,
              borderWidth: 1,
              borderColor: theme.LineColor,
            }}
          >
            {renderOptionsList(mainOptions)}
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: theme.LineColor,
              backgroundColor: theme.BackGround,
              borderRadius: 14,
              padding: 15,
              marginHorizontal: 15,
              marginVertical: 14,
            }}
          >
            {renderOptionsList(supportOptions)}
          </View>

          <View
            style={{
              backgroundColor: theme.BackGround,
              borderRadius: 14,
              padding: 15,
              marginHorizontal: 15,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: theme.LineColor,
            }}
          >
            {renderOptionsList(logoutOption)}
          </View>
        </ScrollView>

        {/* MUI-style Theme Dialog */}
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{
              backgroundColor: theme.BackGround,
              borderRadius: 16,
            }}
          >
            <Dialog.Title style={{ color: theme.ModeText1 }}>
              Select Theme
            </Dialog.Title>
            <Dialog.Content>
              <Button
                mode="contained-tonal"
                onPress={() => handleThemeChange("light")}
                style={{ marginVertical: 4 }}
              >
                Light Theme
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => handleThemeChange("dark")}
                style={{ marginVertical: 4 }}
              >
                Dark Theme
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => handleThemeChange("default")}
                style={{ marginVertical: 4 }}
              >
                Default
              </Button>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}
