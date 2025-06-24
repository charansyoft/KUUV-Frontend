import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "./navigation/RootStack";
import store from "./redux/store";
import { ThemeProvider, useAppTheme } from "../themeContext"; // relative path ok

const queryClient = new QueryClient();

// Wrap this in a separate component to safely use the hook
function AppContent() {
  const { theme } = useAppTheme(); // ✅ hook call fixed

  return (
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <RootStack />
        {/* <ChatInput /> */}
      </ReduxProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent /> {/* ✅ use the wrapper that has access to the theme */}
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
