import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { getJurnalData, toObjectOfArrays } from "../../helperfns/jurnalHelpers";
import { getUserId } from "../../helperfns/InitializeUser";
import { getData } from "../../helperfns/firebaseHelpers";

import Grids from "./Grids";

const colors = {
  title: "black",
  background: "white",
};

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

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{date}</Text>
        <Grids data={aktivitas} type="aktivitas" />
        <Grids data={makan} type="makan" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: colors.background,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
  },
  title: {
    fontSize: 65,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "center",
  },
});
