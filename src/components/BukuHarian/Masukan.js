import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";

export default Masukan = ({ entries, day }) => {
  if (entries[day]) {
    return (
      <View style={styles.masukanView}>
        <Text style={styles.masukanText}>{day}</Text>
        <Text style={styles.masukanText}>
          <Emoji name={entries[day].emotionSelected} />
        </Text>
        <Text style={styles.masukanText}>{entries[day].text}</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  masukanView: {
    margin: 20,
  },
  masukanText: {
    marginBottom: 10,
    fontSize: 20,
  },
});
