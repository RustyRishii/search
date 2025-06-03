import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  StatusBar,
  View,
  Platform,
  FlatList,
  Linking,
  Alert,
  RefreshControl,
} from "react-native";
import React, { use, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import LottieView from "lottie-react-native";

const Home = () => {
  // const navigation = useNavigation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  type searchResults = {
    id: String;
    title: String;
    url: string;
    publishedDate: String;
    author: String;
    text: String;
  };

  const [searchText, setSearchText] = useState<String>("");
  const [search, setSearch] = useState<searchResults[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadingAnimation = useRef<LottieView>(null);

  const webSearch = async () => {
    try {
      const start = performance.now();
      Keyboard.dismiss();
      setIsLoading(true);
      if (searchText === "") return;
      const response = await fetch("https://api.exa.ai/search", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-api-key": "62f09962-21db-4c5e-ae1e-6ecf053e7dc8",
        },
        body: JSON.stringify({
          numResults: 50,
          type: "neural",
          category: "linkedin profile",
          query: searchText,
        }),
      });
      const end = performance.now();
      const duration = end - start;
      console.log(`API call duration: ${(duration / 1000).toFixed(2)} seconds`);
      const responseData = await response.json();
      setSearch(responseData.results);
    } catch (error) {
      console.error(error);
      // Alert.alert(error);
    } finally {
      setIsLoading(false); // ✅ Stop loading no matter what
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    webSearch();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" backgroundColor="black" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        {isLoading ? (
          <LottieView
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              alignContent: "center",
              flex: 1,
            }}
            ref={loadingAnimation}
            source={require("../../assets/loading.json")}
            autoPlay={true}
            loop={true}
          />
        ) : (
          <FlatList
            data={search}
            scrollEnabled={true}
            contentContainerStyle={styles.resultsContainer}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.resultCard}>
                <Text style={styles.resultTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Pressable onPress={() => Linking.openURL(item?.url)}>
                  <Text style={styles.resultUrl} numberOfLines={1}>
                    {item.url}
                  </Text>
                </Pressable>
                <View style={styles.resultMeta}>
                  {item.author && (
                    <Text style={styles.resultAuthor}>by {item.author}</Text>
                  )}
                  {item.publishedDate && (
                    <Text style={styles.resultDate}>{item.publishedDate}</Text>
                  )}
                </View>
                <Text style={styles.resultText} numberOfLines={3}>
                  {item.text}
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                enabled
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        )}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search something"
            placeholderTextColor="grey"
            style={styles.searchInput}
            onChangeText={(newSearch) => setSearchText(newSearch)}
          />
          <Pressable style={styles.searchButton} onPress={webSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
          {/* <Pressable
            style={styles.searchButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Text style={styles.searchButtonText}>Go</Text>
          </Pressable> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F0F2F5", // Or your desired screen background
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: "row",
    // paddingHorizontal: 20,
    // paddingVertical: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000000", // Changed from '#1F2937' to pure black
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchButton: {
    backgroundColor: "black",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsList: {
    flex: 1,
  },
  resultsContainer: {
    // flex: 1,
    // paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    lineHeight: 24,
  },
  resultUrl: {
    fontSize: 14,
    color: "#3B82F6",
    marginBottom: 12,
    textDecorationLine: "underline",
  },
  resultMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultAuthor: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  resultDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  resultText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});
