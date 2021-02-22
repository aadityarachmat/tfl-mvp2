import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Emoji from "react-native-emoji";
import PropTypes from "prop-types";

import EmotionsView from "./EmotionsView";

export default class OptionsView extends React.Component {
  state = {
    pickerVisible: false,
  };

  togglePicker = () => {
    this.setState((prevState) => ({ pickerVisible: !prevState.pickerVisible }));
  };

  onSelectEmotion = (emotion) => {
    this.props.selectEmotion(emotion);
    this.togglePicker();
  };

  render() {
    // TODO: getPhoto
    const { pickerVisible } = this.state;
    const { submit, emotionSelected, getPhoto, reload } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => getPhoto()}>
            <Icon name="camera-alt" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.togglePicker()}>
            <Emoji name={emotionSelected} style={{ fontSize: 30 }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              submit();
              reload();
            }}
          >
            <Icon name="send" size={30} color="darkslateblue" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.delete();
              reload();
            }}
          >
            <Icon name="delete" size={30} color="teal" />
          </TouchableOpacity>
        </View>
        {pickerVisible && (
          <EmotionsView onSelectEmotion={this.onSelectEmotion} />
        )}
      </View>
    );
  }
}

OptionsView.propTypes = {
  emotionSelected: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
