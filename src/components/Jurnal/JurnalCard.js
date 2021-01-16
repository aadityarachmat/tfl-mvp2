import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { getJurnalData, toObjectOfArrays } from "../../helperfns/jurnalHelpers";
import { getUserId } from "../../helperfns/InitializeUser";
import { getData } from "../../helperfns/firebaseHelpers";

import Grids from "./Grids";

export default class JurnalCard extends React.Component {
  state = {
    aktivitas: {},
    makan: {},
  };

  componentDidMount() {
    this.setDataToState();
  }

  setDataToState = () => {
    const { date, data } = this.props;

    if (data[date]) {
      const aktivitasObj = data[date]["aktivitas"];
      const makanObj = data[date]["makan"];
      const aktivitas = toObjectOfArrays(aktivitasObj);
      const makan = toObjectOfArrays(makanObj);

      this.setState({ aktivitas, makan });
    }
  };

  // type is for making the photos path
  render() {
    const { aktivitas, makan } = this.state;

    const { date } = this.props;

    if (aktivitas && makan) {
      console.log("aktivitas && makan");
      return (
        <View style={styles.card}>
          <Text style={styles.title}>{date}</Text>
          <Text>Aktivitas:</Text>
          <Grids data={aktivitas} type="JurnalAktivitas" />
          <Text>Makan:</Text>
          <Grids data={makan} type="JurnalMakan" />
        </View>
      );
    }

    if (aktivitas) {
      console.log("aktivitas");
      return (
        <View style={styles.card}>
          <Text style={styles.title}>{date}</Text>
          <Text>Aktivitas:</Text>
          <Grids data={aktivitas} type="JurnalAktivitas" />
        </View>
      );
    }

    if (makan) {
      console.log("makan");
      return (
        <View>
          <Text style={styles.title}>{date}</Text>
          <Text>Makan:</Text>
          <Grids data={makan} type="JurnalMakan" />
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: "lightgrey",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
