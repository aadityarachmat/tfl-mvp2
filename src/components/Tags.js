import React from "react";
import { View, StyleSheet } from "react-native";

import Tag from "./Tag";

const mapTags = (items) =>
  items.map((item, i) => {
    if (i < 4) return <Tag text={item} key={item} />;
  });

export default Tags = () => {
  const items = [
    "hellooo",
    "bakmi",
    "mie goreng",
    "nasi goreng",
    "bakmi",
    "tag6",
    "tag7",
    "tag8",
    "tag9",
  ];
  return <View style={styles.container}>{mapTags(items)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
});
