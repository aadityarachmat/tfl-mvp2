import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import JurnalCards from "../components/Jurnal/JurnalCards";
import {
  AktivitasButton,
  MakanButton,
} from "../components/Jurnal/JurnalButtons";

import { getUserId } from "../helperfns/InitializeUser";
import { getData } from "../helperfns/firebaseHelpers";

const getPath = () => {
  const userId = getUserId();
  return `userData/${userId}/jurnal`;
};

export default class JurnalScreen extends React.Component {
  state = {
    day: "",
    data: {},
    markedDates: {},
  };

  async componentDidMount() {
    await this.setDataToState();
    this.markDatesWithEntries();
  }

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

  render() {
    const { navigation } = this.props;
    const { day, data, markedDates } = this.state;

    console.log("JurnalScreen data", data);

    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={(d) => {
            this.setState({ day: d.dateString });
          }}
          markedDates={markedDates}
        ></Calendar>
        <JurnalCards day={day} data={data} />
        <MakanButton onPress={() => navigation.push("Jurnal Makan")} />
        <AktivitasButton onPress={() => navigation.push("Jurnal Aktivitas")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
