import React from "react";

import { View, StyleSheet, ScrollView, Button } from "react-native";

import getDate, { getLastDays } from "../../helperfns/date";

import JurnalCard from "./JurnalCard";

export default JurnalCards = () => {
  const date = new Date();
  const lastWeek = getLastDays(date, 7);
  return (
    <ScrollView style={styles.container}>
      {lastWeek.map((date, i) => (
        <JurnalCard date={date} key={i} />
      ))}
      <View style={styles.viewToPreventButtonsFromObscuringContent}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  viewToPreventButtonsFromObscuringContent: {
    height: 120,
  },
});
