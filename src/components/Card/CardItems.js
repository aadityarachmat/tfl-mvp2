import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import getIcon from "../../helperfns/getIcons";

import { ToggleableIconTag } from "../Jurnal/IconTag";

export default class CardItems extends React.Component {
  render() {
    const { items } = this.props;
    const itemsKeys = Object.keys(items);
    const itemsValues = Object.values(items);

    return (
      <View style={styles.cardContent}>
        {itemsKeys.map((key) => (
          <View key={key}>
            <ToggleableIconTag
              key={key}
              text={items[key]["value"]}
              icon={items[key]["value"]}
              onPress={() => this.props.toggleSelected(key)}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
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
