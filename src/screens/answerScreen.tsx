import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
  Linking,
} from "react-native";
import UniversalStyles from "../UniversalStyles";
import BaseUrl from "../constants";
import Hyperlink from "react-native-hyperlink";
import Markdown from "react-native-markdown-display";
import LottieLoadingComponent from "../components/LottieLoadingComponent";

const AnswerScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  type AnswerResult = {
    answer: String;
  };
  const [answerText, setAnswerText] = useState("");
  const [answer, setAnswer] = useState<AnswerResult>();

  const AnswerLottieRef = useRef<LottieView>(null);

  const answerCall = async () => {
    try {
      const start = performance.now();
      console.log("Answering");
      Keyboard.dismiss();
      setIsLoading(true);
      if (answerText === "") return;
      const response = await fetch(`${BaseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-api-key": process.env.EXPO_PUBLIC_EXA_API_KEY,
        },
        body: JSON.stringify({
          model: "exa",
          messages: [
            {
              role: "user",
              content: answerText,
            },
          ],
          text: true,
        }),
      });
      const end = performance.now();
      const duration = end - start;
      console.log(`API call duration: ${(duration / 1000).toFixed(2)} seconds`);
      const responseData = await response.json();
      console.log(responseData.choices[0].message.content);
      console.log;
      // setAnswer(responseData.answer);
      setAnswer({ answer: responseData.choices[0].message.content });
      // setAnswer(responseData.choices[0].message.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={UniversalStyles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "flex-end" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={{ justifyContent: "flex-start", flex: 1 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: "400" }}>
            {answer?.answer}
          </Text> */}
          {/* <Hyperlink
            linkStyle={{ color: "#2980b9", textDecorationLine: "underline" }}
            onPress={(url) => Linking.openURL(url)}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>
              {answer?.answer}
            </Text>
          </Hyperlink> */}
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
              ref={AnswerLottieRef}
              source={require("../../assets/LottieFiles/searchLoading.json")}
              autoPlay={true}
              loop={true}
            />
          ) : !answer || !answer.answer ? (
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
              Ask anyhting
            </Text>
          ) : (
            <Markdown
              onLinkPress={(url) => {
                Linking.openURL(url);
                return true;
              }}
              style={{
                body: { fontSize: 16 },
                link: { color: "#3498db" },
              }}
            >
              {answer?.answer || ""}
            </Markdown>
          )}
        </View>

        <View style={UniversalStyles.searchContainer}>
          <TextInput
            autoFocus={true}
            placeholder="Search something"
            placeholderTextColor="grey"
            style={UniversalStyles.searchInput}
            value={answerText}
            onChangeText={(newText) => {
              setAnswerText(newText);
            }}
          />
          <Pressable style={UniversalStyles.searchButton} onPress={answerCall}>
            <Text style={UniversalStyles.searchButtonText}>Answer</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AnswerScreen;

const styles = StyleSheet.create({});
