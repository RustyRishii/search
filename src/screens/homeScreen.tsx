import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../components/AppText";
import AnswerScreen from "./answerScreen";

type HomeStackParamList = {
  Home: undefined;
  DetailsScreen: { title: String; text: String };
  SearchScreen: undefined;
  AnswerScreen: undefined;
  ResearchScreen: undefined;
};

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" backgroundColor="black" />
      {/* <KeyboardAvoidingView
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
              flex: 1,
            }}
            ref={loadingAnimation}
            source={require("../../assets/loading.json")}
            autoPlay={true}
            loop={true}
          />
        ) : search.length === 0 ? (
          <Text
            style={{
              fontSize: 20,
              flex: 1,
              textAlignVertical: "center",
              justifyContent: "center",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Search something
          </Text>
        ) : (
          <FlatList
            data={search}
            scrollEnabled={true}
            contentContainerStyle={styles.resultsContainer}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("DetailsScreen", {
                    title: item.title,
                    text: item.text,
                  })
                }
              >
                <View style={styles.resultCard}>
                  <Text style={styles.resultTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Pressable onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.resultUrl} numberOfLines={1}>
                      {item.url}
                    </Text>
                  </Pressable>
                  <View style={styles.resultMeta}>
                    {item.author && (
                      <Text style={styles.resultAuthor}>by {item.author}</Text>
                    )}
                    {item.publishedDate && (
                      <Text style={styles.resultDate}>
                        {item.publishedDate}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.resultText} numberOfLines={3}>
                    {item.text}
                  </Text>
                </View>
              </Pressable>
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
        </View>
      </KeyboardAvoidingView> */}
      <View
        style={{
          borderColor: "green",
          justifyContent: "center",
          gap: 8,
          flex: 1,
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            style={styles.tab}
            onPress={() => {
              console.log("Search pressed");
              navigation.navigate("SearchScreen");
            }}
          >
            <AppText style={{ fontFamily: "Inter", fontSize: 24 }}>
              Search
            </AppText>
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => {
              console.log("Contents pressed");
            }}
          >
            <AppText style={{ fontFamily: "Inter", fontSize: 24 }}>
              Contents
            </AppText>
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            style={styles.tab}
            onPress={() => {
              navigation.navigate("AnswerScreen");
            }}
          >
            <AppText style={{ fontFamily: "Inter", fontSize: 24 }}>
              Answers
            </AppText>
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => {
              navigation.navigate("ResearchScreen");
            }}
          >
            <Text style={{ fontSize: 24 }}>Research</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: "row",
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
  lottieLoadingView: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    flex: 1,
  },
  tab: {
    borderRadius: 8,
    flex: 1,
    elevation: 8,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 24,
    backgroundColor: "#f8f8ff",
    height: 100,
  },
});
