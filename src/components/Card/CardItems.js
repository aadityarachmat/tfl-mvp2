import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import getIcon from "../../helperfns/getIcons";

// TODO: delete(iLength); move to helperfns
const transform = (items, iLength, jLength) => {
  let index = 0;
  const itemsKeys = Object.keys(items);
  const itemsValues = Object.values(items);
  const arr = [];
  for (i = 0; i < iLength; i++) {
    if (typeof itemsValues[index] === "undefined") break;
    arr.push([]);
    for (j = 0; j < jLength; j++) {
      if (typeof itemsValues[index] === "undefined") break;
      arr[i].push({ ...itemsValues[index], key: itemsKeys[index] });
      index++;
    }
  }
  return arr;
};

export default class CardItems extends React.Component {
  renderCol = (item, j) => {
    return (
      <View key={j} style={[styles.column, item.selected && styles.selected]}>
        <TouchableOpacity onPress={() => this.props.toggleSelected(item.key)}>
          {getIcon(item.value)}
          <Text style={styles.text}>{item.value}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderRow = (row, i) => (
    <View key={i} style={styles.row}>
      {row.map((item, j) => this.renderCol(item, j))}
    </View>
  );

  renderGrid = (arr) => arr.map((row, i) => this.renderRow(row, i));

  render() {
    const arr = transform(this.props.items, 200, 3);
    return <View style={styles.cardContent}>{this.renderGrid(arr)}</View>;
  }
}

const styles = StyleSheet.create({
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  row: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
  },
  selected: {
    backgroundColor: "lightblue",
  },
});
