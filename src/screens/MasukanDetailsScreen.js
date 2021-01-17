import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, Image, ScrollView, Modal } from "react-native";
import Emoji from "react-native-emoji";
import * as firebase from "firebase";
import { withTheme } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialIcons";

import EditEntryButton from "../components/BukuHarian/EditEntryButton";
import ModalView from "../components/BukuHarian/ModalView";

const colors = {
  header: "black",
  text: "grey",
  cardBackground: "white",
  background: "white",
};

export default class MasukanDetailsScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
  };

  render() {
    const { route } = this.props;
    const { modalVisible } = this.state;
    const { uri, entries, day } = route.params;
    return (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide">
          <ModalView toggleModal={this.toggleModal} day={day} />
        </Modal>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.imageView, styles.shadow]}>
            {uri !== "" ? (
              <Image source={{ uri: uri }} style={styles.image} />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
          <View style={[styles.cardView, styles.shadow]}>
            <View style={styles.dateView}>
              <Icon name="today" size={35} color={colors.header} />
              <Text style={styles.dateText}>{day}</Text>
            </View>
            <Text style={styles.emoji}>
              <Emoji name={entries[day].emotionSelected} />
            </Text>
            <Text style={styles.masukanText}>{entries[day].text}</Text>
          </View>
          <View style={styles.preventsButtonFromObscuringContent} />
        </ScrollView>
        <EditEntryButton onPress={this.toggleModal} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background },
  scrollView: {
    padding: 20,
    height: "100%",
  },
  dateText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.header,
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
    color: colors.text,
    textAlign: "center",
  },
  image: { height: "100%", width: "100%", borderRadius: 20 },
  cardView: {
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    alignItems: "center",
  },
  imageView: {
    height: 400,
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  preventsButtonFromObscuringContent: {
    height: 150,
  },
});
