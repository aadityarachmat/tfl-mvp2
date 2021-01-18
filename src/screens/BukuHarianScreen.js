import React from "react";
import { StyleSheet, Button, View, Modal } from "react-native";
import * as firebase from "firebase";
import { Calendar } from "react-native-calendars";

import { getUserId } from "../helperfns/InitializeUser";
import { getImageURI } from "../helperfns/firebaseHelpers";
import getDate from "../helperfns/date";

import EntryPreview from "../components/BukuHarian/EntryPreview";
import EntryPreviews from "../components/BukuHarian/EntryPreviews";
import ModalView from "../components/BukuHarian/ModalView";
import NewEntryButton from "../components/BukuHarian/NewEntryButton";
import ToggleCalendar from "../components/ToggleCalendar";

const colors = {
  background: "white",
};

const emotionColors = {
  grin: "lightgreen",
  joy: "lightgreen",
  blush: "lightgreen",
  heart_eyes: "lightgreen",
  sunglasses: "lightgreen",
  sleepy: "gold",
  neutral_face: "gold",
  disappointed: "gold",
  sob: "crimson",
  rage: "crimson",
};

const getMarkedDates = (data, dateSelected) => {
  const markedDates = {};
  for (let [key, value] of Object.entries(data)) {
    const emotionSelected = value["emotionSelected"];
    const color = emotionColors[emotionSelected];

    const selected = key === dateSelected;

    markedDates[key] = {
      startingDay: true,
      endingDay: true,
      color: color,
      selected: selected,
    };
  }
  return markedDates;
};

export default class BukuHarianScreen extends React.Component {
  // TODO: add loading screen!!
  state = {
    bukuHarianEntries: {},
    markedDates: {},
    modalVisible: false,
    calendarVisible: false,
    day: "",
  };

  async componentDidMount() {
    await this.setBukuHarianEntriesToState();
    this.setTodayToState();
    this.setMarkedDatesToState(this.state.day);
  }

  setMarkedDatesToState = (dateSelected) => {
    const { bukuHarianEntries } = this.state;
    const markedDates = getMarkedDates(bukuHarianEntries, dateSelected);
    this.setState({ markedDates });
  };

  setTodayToState = () => {
    const today = getDate();
    this.setState({ day: today });
  };

  async setBukuHarianEntriesToState() {
    database = firebase.database();
    const userId = getUserId();

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

    this.setState({ bukuHarianEntries });
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

  toggleCalendar = () => {
    this.setState((prevState) => ({
      calendarVisible: !prevState.calendarVisible,
    }));
  };

  render() {
    const {
      bukuHarianEntries,
      markedDates,
      day,
      modalVisible,
      calendarVisible,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide">
          <ModalView toggleModal={this.toggleModal} day={day} />
        </Modal>

        <ToggleCalendar
          toggleCalendar={this.toggleCalendar}
          minimized={calendarVisible}
        />

        {calendarVisible && (
          <Calendar
            onDayPress={(d) => {
              this.setState({ day: d.dateString });
              this.setMarkedDatesToState(d.dateString);
            }}
            // TODO: implement onMonthChange
            onMonthChange={(month) => {
              this.setState({ month });
            }}
            markedDates={markedDates}
            markingType={"period"}
          ></Calendar>
        )}

        <EntryPreviews
          entries={bukuHarianEntries}
          navigation={navigation}
          day={day}
        />
        <NewEntryButton onPress={() => this.toggleModal()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  EntryPreviewTanggal: {
    marginBottom: 10,
    fontSize: 20,
  },
  image: {
    marginBottom: 40,
  },
});
