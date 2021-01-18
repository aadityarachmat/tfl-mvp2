import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import JurnalCards from "../components/Jurnal/JurnalCards";
import {
  AktivitasButton,
  MakanButton,
} from "../components/Jurnal/JurnalButtons";
import ToggleCalendar from "../components/ToggleCalendar";

import getDate from "../helperfns/date";
import { getUserId } from "../helperfns/InitializeUser";
import { getData } from "../helperfns/firebaseHelpers";

const getPath = () => {
  const userId = getUserId();
  return `userData/${userId}/jurnal`;
};

const colors = {
  background: "white",
};

export default class JurnalScreen extends React.Component {
  state = {
    day: "",
    data: {},
    markedDates: {},
    calendarVisible: false,
  };

  async componentDidMount() {
    await this.setDataToState();
    this.setDayAsToday();
    this.markDatesWithEntries();
  }

  setDayAsToday = () => {
    const today = getDate();
    this.setState({ day: today });
  };

  setDataToState = async () => {
    const path = getPath();
    const data = await getData(path);
    this.setState({ data });
  };

  markDatesWithEntries = () => {
    const { data } = this.state;
    const markedDates = {};
    for (let [key, value] of Object.entries(data)) {
      markedDates[key] = { marked: true };
    }
    this.setState({ markedDates });
  };

  toggleCalendar = () => {
    this.setState((prevState) => ({
      calendarVisible: !prevState.calendarVisible,
    }));
    console.log(this.state.calendarVisible);
  };

  render() {
    const { navigation } = this.props;
    const { day, data, markedDates, calendarVisible } = this.state;
    return (
      <View style={styles.container}>
        <ToggleCalendar
          toggleCalendar={this.toggleCalendar}
          minimized={calendarVisible}
        />
        {calendarVisible && (
          <Calendar
            onDayPress={(d) => {
              this.setState({ day: d.dateString });
            }}
            markedDates={markedDates}
          ></Calendar>
        )}

        {data && <JurnalCards day={day} data={data} />}
        <MakanButton onPress={() => navigation.push("Jurnal Makan")} />
        <AktivitasButton onPress={() => navigation.push("Jurnal Aktivitas")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
