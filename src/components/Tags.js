import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { UnselectedTag, SelectedTag, TouchableTag } from "./Tag";

const mapTags = (items, type) =>
  items.map((item, i) => {
    if (i < 3) {
      if (type === "Unselected")
        return <UnselectedTag text={item} key={item} />;
      if (type === "Selected") return <SelectedTag text={item} key={item} />;
      if (type === "Touchable") return <TouchableTag text={item} key={item} />;
    }
  });

export default Tags = ({ category, items, type }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{category}</Text>
      <View style={styles.tagsContainer}>{mapTags(items, type)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
