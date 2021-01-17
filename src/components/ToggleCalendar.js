import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const colors = {
  icon: "purple",
};

const ToggleMinimizedButton = ({ minimized, toggleCalendar }) => (
  <TouchableOpacity onPress={() => toggleCalendar()}>
    {!minimized && (
      <View style={styles.iconBackgroundUnfilled}>
        <FontAwesomeIcon name="calendar" size={22} color={colors.icon} />
      </View>
    )}
    {minimized && (
      <View style={styles.iconBackgroundFilled}>
        <FontAwesomeIcon name="calendar" size={22} color="white" />
      </View>
    )}
  </TouchableOpacity>
);

export default ToggleCalendar = ({ title, toggleCalendar, minimized }) => (
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
  iconBackgroundUnfilled: {
    height: 32,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.icon,
  },
  iconBackgroundFilled: {
    backgroundColor: colors.icon,
    height: 32,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
