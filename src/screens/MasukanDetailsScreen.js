import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Emoji from "react-native-emoji";
import * as firebase from "firebase";
import { withTheme } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialIcons";

import EditEntryButton from "../components/BukuHarian/EditEntryButton";

export default class MasukanDetailsScreen extends React.Component {
  render() {
    const { route } = this.props;
    const { uri, entries, day } = route.params;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.imageView, styles.shadow]}>
            {uri !== "" ? (
              <Image source={{ uri: uri }} style={styles.image} />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
          <View style={[styles.textView, styles.shadow]}>
            <View style={styles.dateView}>
              <Icon name="today" size={35} color="teal" />
              <Text style={styles.dateText}>{day}</Text>
            </View>
            <Text style={styles.emoji}>
              <Emoji name={entries[day].emotionSelected} />
            </Text>
            <Text style={styles.masukanText}>{entries[day].text}</Text>
          </View>
          <View style={styles.preventsButtonFromObscuringContent} />
        </ScrollView>
        <EditEntryButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    padding: 20,
    height: "100%",
    backgroundColor: "white",
  },
  dateText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "teal",
    textDecorationLine: "underline",
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  masukanText: {
    fontSize: 18,
  },
  image: { height: "100%", width: "100%", borderRadius: 10 },
  textView: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  imageView: {
    height: 400,
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  preventsButtonFromObscuringContent: {
    height: 150,
  },
});
