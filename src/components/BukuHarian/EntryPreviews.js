import React from "react";
import { render } from "react-dom";
import { View, ScrollView, StyleSheet } from "react-native";

import EntryPreview from "./EntryPreview";

import { getLastDays, toDateObject } from "../../helperfns/date";

export default class EntryPreviews extends React.Component {
  render() {
    const { entries, navigation, day } = this.props;

    const dateObject = toDateObject(day);

    console.log("day", day);
    console.log("dateObject", dateObject);

    const lastWeek = getLastDays(dateObject, 7);
    console.log(lastWeek);
    return (
      <ScrollView style={styles.container}>
        {lastWeek.map((day, i) => {
          console.log(day);
          return (
            <EntryPreview
              entries={entries}
              day={day}
              navigation={navigation}
              key={i}
            />
          );
        })}
        <View style={styles.viewToPreventButtonsFromObscuringContent}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  viewToPreventButtonsFromObscuringContent: {
    height: 140,
  },
});
