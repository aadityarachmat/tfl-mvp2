import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default ModalHeader = ({ currentDate, toggleModal }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>Buku Harian</Text>
      <Text style={styles.date}>{currentDate}</Text>
    </View>
    <TouchableOpacity
      style={{ marginBottom: 50 }}
      onPress={() => toggleModal()}
    >
      <Icon name="close" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "cadetblue",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  date: {
    marginBottom: 40,
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 20,
    color: "orange",
  },
});
