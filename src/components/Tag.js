import React from "react";
import { View, Text, StyleSheet } from "react-native";

const colors = {
  tag: "mediumseagreen",
};

export default Tag = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: colors.tag,
  },
  text: {
    color: colors.tag,
  },
});
