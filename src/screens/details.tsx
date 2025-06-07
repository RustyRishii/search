import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type HomeStackParamList = {
  Home: undefined;
  DetailsScreen: { title: String; text: String };
};

const DetailsScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "DetailsScreen">>();
  const { title, text } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
    textAlign: "left",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4a4a4a",
    textAlign: "left",
  },
});

export default DetailsScreen;
