import React from "react";
import { StyleSheet, Button, View, Modal } from "react-native";
import * as firebase from "firebase";
import { Calendar } from "react-native-calendars";

import { getUserId } from "../helperfns/InitializeUser";

import EntryPreview from "../components/BukuHarian/EntryPreview";
import EntryPreviews from "../components/BukuHarian/EntryPreviews";
import ModalView from "../components/BukuHarian/ModalView";
import NewEntryButton from "../components/BukuHarian/NewEntryButton";
import ToggleCalendar from "../components/ToggleCalendar";

const colors = {
  background: "white",
};

export default class BukuHarianScreen extends React.Component {
  // TODO: add loading screen!!
  state = {
    bukuHarianEntries: {},
    markedDates: {},
    modalVisible: false,
    calendarVisible: true,
    month: {},
    uri: "",
    userId: "testUserId",
    day: "",
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
    let EntryPreviewBaruText = "";

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

    // Mark dates with entries
    for (let [key, value] of Object.entries(bukuHarianEntries)) {
      markedDates[key] = { marked: true };
    }

    // Set the value of EntryPreviewBaruText if the user saved an entry earlier today
    if (bukuHarianEntries[currentDate]) {
      EntryPreviewBaruText =
        bukuHarianEntries[currentDate].EntryPreviewBaruText;
    }

    this.setState({
      bukuHarianEntries,
      markedDates,
      currentDate,
      userId,
      EntryPreviewBaruText,
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
          <ModalView
            initialize={this.initialize}
            toggleModal={this.toggleModal}
          />
        </Modal>

        <ToggleCalendar
          toggleCalendar={this.toggleCalendar}
          minimized={calendarVisible}
        />

        {calendarVisible && (
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
