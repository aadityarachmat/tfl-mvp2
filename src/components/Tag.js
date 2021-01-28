import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const colors = {
  tag: "#64dfdf",
};

export const UnselectedTag = ({ text }) => (
  <View style={[styles.container]}>
    <Text style={styles.unselectedText}>{text}</Text>
  </View>
);

export const SelectedTag = ({ text }) => (
  <View style={[styles.container, styles.selectedContainer]}>
    <Text style={styles.selectedText}>{text}</Text>
  </View>
);

export class TouchableTag extends React.Component {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) onPress();
  };

  render() {
    const { text, selected } = this.props;
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        {selected ? <SelectedTag text={text} /> : <UnselectedTag text={text} />}
      </TouchableOpacity>
    );
  }
}

export class ToggleableTag extends React.Component {
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
    const { text } = this.props;
    const { selected } = this.state;
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        {selected ? <SelectedTag text={text} /> : <UnselectedTag text={text} />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 100,
    padding: 10,
    marginRight: 5,
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
