import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default EditEntryButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name="create" size={40} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "deepskyblue",
    borderRadius: 100,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
