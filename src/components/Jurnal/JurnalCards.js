import React from "react";

import { View, StyleSheet, ScrollView, Button } from "react-native";

import { toDateObject, getLastDays } from "../../helperfns/date";

import JurnalCard from "./JurnalCard";

export default class JurnalCards extends React.Component {
  render() {
    const { day, data } = this.props;
    const dateObject = toDateObject(day);
    const lastWeek = getLastDays(dateObject, 7);
    return (
      <ScrollView style={styles.container}>
        {lastWeek.map((date, i) => {
          if (data[date]) {
            return <JurnalCard date={date} key={i} data={data} />;
          }
          return null;
        })}
        <View style={styles.viewToPreventButtonsFromObscuringContent}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  viewToPreventButtonsFromObscuringContent: {
    height: 120,
  },
});
