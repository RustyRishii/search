import { StyleSheet, View } from "react-native";
import Home from "./src/screens/home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./src/screens/settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Bookmark from "./src/screens/bookmark";
import HomeIcon from "./src/Icons/home";
import SettingsIcon from "./src/Icons/settingsIcon";
import BookmarkIcon from "./src/Icons/bookmark";

import HomeFilled from "./assets/BottomNavBar/HomeFilled.svg";
import HomeEmpty from "./assets/BottomNavBar/HomeEmpty.svg";
import SettingsFilled from "./assets/BottomNavBar/SettingsFilled.svg";
import SettingsEmpty from "./assets/BottomNavBar/SettingsEmpty.svg";
import BookmarkEmpty from "./assets/BottomNavBar/BookmarkEmpty.svg";
import BookmarkFilled from "./assets/BottomNavBar/BookmarkFilled.svg";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <BottomTabBarStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
const iconSize = { width: 25, height: 25 };

function BottomTabBarStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeFilled {...iconSize} />
            ) : (
              <HomeEmpty {...iconSize} />
            ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SettingsFilled {...iconSize} />
            ) : (
              <SettingsEmpty {...iconSize} />
            ),
        }}
        name="Settings"
        component={Settings}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BookmarkFilled {...iconSize} />
            ) : (
              <BookmarkEmpty {...iconSize} />
            ),
        }}
        name="Bookmark"
        component={Bookmark}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

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
