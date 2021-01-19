import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
        <View style={styles.titleView}>
          <Icon name="today" size={48} color={colors.header} />
          <Text style={styles.title}>{date}</Text>
        </View>

        <Grids data={aktivitas} type="aktivitas" />
        <Grids data={makan} type="makan" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.background,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "center",
  },
});
