import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import LottieView from "lottie-react-native";

interface LottieLoadingComponentProps {
  source: any; // or string if you're using URLs
  width?: number;
  height?: number;
}

const LottieLoadingComponent = forwardRef<
  LottieView,
  LottieLoadingComponentProps
>(({ source, width = 300, height = 300 }, ref) => {
  return (
    <View>
      <LottieView
        style={{
          width,
          height,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          flex: 1,
        }}
        ref={ref}
        source={source}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
});

export default LottieLoadingComponent;
