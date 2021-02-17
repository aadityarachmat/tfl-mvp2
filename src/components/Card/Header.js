import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const ToggleMinimizedButton = ({ minimized, toggleMinimized }) => (
  <TouchableOpacity onPress={() => toggleMinimized()}>
    {minimized && <Icon name="pluscircle" size={22} color="#037bfc" />}
    {!minimized && <Icon name="minuscircleo" size={22} color="#037bfc" />}
  </TouchableOpacity>
);

export default Header = ({ title, toggleMinimized, minimized }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <ToggleMinimizedButton
      minimized={minimized}
      toggleMinimized={toggleMinimized}
    />
  </View>
);
const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },
});
