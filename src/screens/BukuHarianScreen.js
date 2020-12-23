import React from "react";
import { StyleSheet, Button, View, Modal } from "react-native";
import * as firebase from "firebase";
import { Calendar } from "react-native-calendars";

import { getUserId } from "../helperfns/InitializeUser";

import Masukan from "../components/BukuHarian/Masukan";
import ModalView from "../components/BukuHarian/ModalView";
import NewEntryButton from "../components/BukuHarian/NewEntryButton";

export default class BukuHarianScreen extends React.Component {
  // TODO: add loading screen!!
  state = {
    bukuHarianEntries: {},
    markedDates: {},
    modalVisible: false,
    month: {},
    uri: "",
    userId: "testUserId",
  };

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    // TODO: save marked dates key properly!
    // TODO: initialize emotionSelected
    database = firebase.database();
    const userId = getUserId();
    const currentDate = getDate();
    const markedDates = {};
    let masukanBaruText = "";

    // Get bukuHarianEntries
    bukuHarianEntries = await database
      .ref(`/userData/${userId}/bukuHarian`)
      .once("value")
      .then((snap) => {
        if (snap.exists()) {
          return snap.val();
        } else {
          return {};
        }
      });

    console.log(bukuHarianEntries)

    // Mark dates with entries
    for (let [key, value] of Object.entries(bukuHarianEntries)) {
      markedDates[key] = { marked: true };
      // console.log("key", key)
    }

    // Set the value of masukanBaruText if the user saved an entry earlier today
    if (bukuHarianEntries[currentDate]) {
      masukanBaruText = bukuHarianEntries[currentDate].masukanBaruText;
    }

    this.setState({
      bukuHarianEntries,
      markedDates,
      currentDate,
      userId,
      masukanBaruText,
    });
  }

  // todo: can edit old entries
  toggleModal = () => {
    const { modalVisible } = this.state;
    if (modalVisible) {
      this.setState({ modalVisible: false });
    } else {
      this.setState({ modalVisible: true });
    }
  };

  render() {
    const { bukuHarianEntries, markedDates, day, modalVisible } = this.state;


    return (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide">
          <ModalView
            initialize={this.initialize}
            toggleModal={this.toggleModal}
          />
        </Modal>

        <Calendar
          onDayPress={(d) => {
            this.setState({ day: d.dateString });
          }}
          // TODO: implement onMonthChange
          onMonthChange={(month) => {
            this.setState({ month });
          }}
          markedDates={markedDates}
        ></Calendar>

        <Masukan entries={bukuHarianEntries} day={day} />
        <NewEntryButton onPress={() => this.toggleModal()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  masukanTanggal: {
    marginBottom: 10,
    fontSize: 20,
  },
  image: {
    marginBottom: 40,
  },
});
