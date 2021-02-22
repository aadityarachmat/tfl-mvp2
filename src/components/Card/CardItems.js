import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { TouchableIconTag } from "../IconTag";

export default class CardItems extends React.Component {
  render() {
    const { items } = this.props;
    const itemsKeys = Object.keys(items);
    return (
      <View style={styles.cardContent}>
        {itemsKeys.map((key) => {
          return (
            <View key={key}>
              <TouchableIconTag
                text={items[key]["value"]}
                icon={items[key]["value"]}
                selected={items[key]["selected"]}
                onPress={() => this.props.toggleSelected(key)}
              />
            </View>
          );
        })}
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
});
