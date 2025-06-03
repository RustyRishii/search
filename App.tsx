import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./src/screens/settings";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Rootstack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

// const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  Home: undefined; // No params for Home screen
  Settings: undefined; // No params for Settings screen
  // If Settings took a userId param, it would be: Settings: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Rootstack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
