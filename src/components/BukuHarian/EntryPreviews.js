import React from "react";
import { render } from "react-dom";
import { View, ScrollView, StyleSheet } from "react-native";

import EntryPreview from "./EntryPreview";

import { getLastDays, toDateObject } from "../../helperfns/date";

export default class EntryPreviews extends React.Component {
  render() {
    const { entries, navigation, day } = this.props;

    const dateObject = toDateObject(day);

    const lastWeek = getLastDays(dateObject, 7);
    return (
      <ScrollView style={styles.container}>
        {lastWeek.map((day) => {
          if (entries[day])
            return (
              <EntryPreview
                entries={entries}
                day={day}
                navigation={navigation}
                key={day}
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
