import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      {/* <View style={styles.fullScreen}> */}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text style={styles.buttonText}>
            {selectedOption || "Select an option"}
          </Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdown}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => {
                  setSelectedOption(option); // Now TypeScript accepts `option` (a string)
                  setIsOpen(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    width: 200,
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Dropdown;
