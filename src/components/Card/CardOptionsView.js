import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Emoji from "react-native-emoji";

export default class CardOptionsView extends React.Component {
  render() {
    const { getPhoto, submit } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => getPhoto()}>
          <Icon name="camera-alt" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => submit()}>
          <Icon name="send" size={30} color="darkslateblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.delete()}>
          <Icon name="delete" size={30} color="teal" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
