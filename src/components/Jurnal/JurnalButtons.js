import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const AktivitasButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, styles.aktivitasButton]}
  >
    <Icon name="directions-run" size={40} color="white" />
  </TouchableOpacity>
);

export const MakanButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, styles.makanButton]}
  >
    <Icon name="restaurant" size={40} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 30,
    bottom: 30,
    backgroundColor: "#037bfc",
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
  aktivitasButton: {
    right: 120,
    backgroundColor: "#42E2B8",
  },
  makanButton: {
    backgroundColor: "#2D82B7",
  },
});
