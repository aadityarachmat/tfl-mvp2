import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import { UnselectedTag, SelectedTag, TouchableTag, ToggleableTag } from "./Tag";
import { TouchableIconTag, ToggleableIconTag } from "./IconTag";

const mapTags = (items, type, selected) => {
  return items.map((item) => {
    if (type === "Unselected") return <UnselectedTag text={item} key={item} />;
    if (type === "Selected") return <SelectedTag text={item} key={item} />;
    if (type === "Touchable")
      return <TouchableTag text={item} key={item} selected={selected} />;
    if (type === "Toggleable")
      return <ToggleableTag text={item} key={item} selected={selected} />;
    if (type === "TouchableIcon")
      return (
        <TouchableIconTag
          text={item}
          icon={item}
          key={item}
          selected={selected}
        />
      );
    if (type === "ToggleableIcon")
      return (
        <ToggleableIconTag
          text={item}
          icon={item}
          key={item}
          selected={selected}
        />
      );
  });
};

export default Tags = ({ items, type, selected, width }) => {
  return (
    <ScrollView style={[styles.container, { width: width }]} horizontal={true}>
      <View style={styles.tagsContainer}>{mapTags(items, type, selected)}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
