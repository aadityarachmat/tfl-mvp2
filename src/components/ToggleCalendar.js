import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ToggleMinimizedButton = ({ minimized, toggleCalendar }) => (
  <TouchableOpacity onPress={() => toggleCalendar()}>
    {!minimized && <Icon name="pluscircle" size={22} color="#037bfc" />}
    {minimized && <Icon name="minuscircleo" size={22} color="#037bfc" />}
  </TouchableOpacity>
);

export default Minimize = ({ title, toggleCalendar, minimized }) => (
  <View style={styles.container}>
    <ToggleMinimizedButton
      minimized={minimized}
      toggleCalendar={toggleCalendar}
    />
  </View>
);

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    margin: 10,
    alignItems: "center",
  },
});
