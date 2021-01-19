import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import getIcon from "../../helperfns/getIcons";

const colors = {
  tag: "#64dfdf",
};

export const UnselectedIconTag = ({ icon, text }) => (
  <View style={styles.container}>
    {getIcon(icon)}
    <Text style={styles.unselectedText}>{text}</Text>
  </View>
);

export const SelectedIconTag = ({ icon, text }) => (
  <View style={[styles.container, styles.selectedContainer]}>
    {getIcon(icon)}
    <Text style={styles.selectedText}>{text}</Text>
  </View>
);

export class ToggleableIconTag extends React.Component {
  state = {
    selected: this.props.selected,
  };

  toggle = () => {
    this.setState((prevState) => ({ selected: !prevState.selected }));
  };

  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
    this.toggle();
  };

  render() {
    const { text, icon } = this.props;
    const { selected } = this.state;
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        {selected ? (
          <SelectedIconTag text={text} icon={icon} />
        ) : (
          <UnselectedIconTag text={text} icon={icon} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 200,
    padding: 20,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.tag,
  },
  unselectedText: {
    color: colors.tag,
    fontWeight: "bold",
  },
  unselectedContainer: {},
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedContainer: {
    backgroundColor: colors.tag,
  },
});
