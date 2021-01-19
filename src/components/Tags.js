import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { UnselectedTag, SelectedTag, TouchableTag, ToggleableTag } from "./Tag";

const truncateText = (index, text) => {
  if (text.length > index) {
    return text.substring(0, index) + "...";
  }
  return text;
};

const getTruncatedCharacterAndWord = (items) => {
  let character = 14;
  let word = 0;
  while (items[word] && character > items[word].length) {
    character = character - items[word].length;
    word++;
  }
  return { character, word };
};

const truncateItems = (items) => {
  let truncatedItems = items;
  let index = items.length - 1;

  const { character, word } = getTruncatedCharacterAndWord(items);
  while (index > word) {
    truncatedItems.pop();
    index--;
  }

  if (truncatedItems[word])
    truncatedItems[word] = truncateText(character, truncatedItems[word]);

  return truncatedItems;
};

const mapTags = (items, type, selected) => {
  const truncatedItems = truncateItems(items);
  return truncatedItems.map((item) => {
    if (type === "Unselected") return <UnselectedTag text={item} key={item} />;
    if (type === "Selected") return <SelectedTag text={item} key={item} />;
    if (type === "Touchable")
      return <TouchableTag text={item} key={item} selected={selected} />;
    if (type === "Toggleable")
      return <ToggleableTag text={item} key={item} selected={selected} />;
  });
};

const colors = {
  tag: "#64dfdf",
};

export default Tags = ({ items, type, selected, max }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {mapTags(items, type, selected, max)}
      </View>
    </View>
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
