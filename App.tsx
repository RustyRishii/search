import { StyleSheet, View } from "react-native";
import Home from "./src/screens/homeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "./src/screens/settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Bookmark from "./src/screens/bookmark";
import HomeFilled from "./assets/BottomNavBar/HomeFilled.svg";
import HomeEmpty from "./assets/BottomNavBar/HomeEmpty.svg";
import SettingsFilled from "./assets/BottomNavBar/SettingsFilled.svg";
import SettingsEmpty from "./assets/BottomNavBar/SettingsEmpty.svg";
import BookmarkEmpty from "./assets/BottomNavBar/BookmarkEmpty.svg";
import BookmarkFilled from "./assets/BottomNavBar/BookmarkFilled.svg";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./src/screens/details";
import HomeScreen from "./src/screens/homeScreen";
import SearchScreen from "./src/screens/searchScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import AnswerScreen from "./src/screens/answerScreen";
import ResearchScreen from "./src/screens/researchScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  console.log("Fonts loaded:", fontsLoaded);

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <SafeAreaProvider>
        <BottomTabBarStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const iconSize = { width: 25, height: 25 };

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type HomeStackParamList = {
  Home: undefined;
  DetailsScreen: { title: String; text: String };
  AnswerSreen: undefined;
  ResearchScreen: undefined;
};

function HomeStackFunc() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        options={{
          gestureEnabled: true,
        }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="SearchScreen"
        options={{
          gestureEnabled: true,
        }}
        component={SearchScreen}
      />
      <HomeStack.Screen
        options={{
          headerShown: true,
        }}
        name="DetailsScreen"
        component={Details}
      />
      <HomeStack.Screen name="AnswerScreen" component={AnswerScreen} />
      <HomeStack.Screen name="ResearchScreen" component={ResearchScreen} />
    </HomeStack.Navigator>
  );
}

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
        name="Home"
        component={HomeStackFunc}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeFilled {...iconSize} />
            ) : (
              <HomeEmpty {...iconSize} />
            ),
        }}
      />
      {/* <Tab.Screen
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
        /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
