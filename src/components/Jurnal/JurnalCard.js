import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { getJurnalData, toObjectOfArrays } from "../../helperfns/jurnalHelpers";

import Grids from "./Grids";

export default class JurnalCard extends React.Component {
  state = {
    aktivitas: "",
    makan: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { date } = this.props;
    const aktivitasObj = await getJurnalData(date, "JurnalAktivitas");
    const makanObj = await getJurnalData(date, "JurnalMakan");
    const aktivitas = toObjectOfArrays(aktivitasObj);
    const makan = toObjectOfArrays(makanObj);
    console.log(aktivitas, makan);
    this.setState({ aktivitas, makan });
  };

  // type is for making the photos path
  render() {
    const { aktivitas, makan } = this.state;
    if (
      Object.keys(aktivitas).length === 0 &&
      Object.keys(makan).length === 0
    ) {
      return null;
    }
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{this.props.date}</Text>
        <Text>Aktivitas:</Text>
        <Grids data={aktivitas} type="JurnalAktivitas" />
        <Text>Makan:</Text>
        <Grids data={makan} type="JurnalMakan" />
      </View>
    );
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
