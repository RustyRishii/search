import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SetIcon from "../../assets/settings.svg";

const Settings = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <SetIcon width={400} height={400} fill="red" />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
