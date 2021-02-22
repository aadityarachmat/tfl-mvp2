import React from "react";
import {
  View,
  ScrollView,
  TextInput,
  Alert,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PropTypes from "prop-types";

import { pickPhoto, takePhoto } from "../../helperfns/Camera";
import { getUserId } from "../../helperfns/InitializeUser";
import {
  getData,
  setData,
  deleteData,
  uploadImage,
  getImageURI,
  deleteImage,
} from "../../helperfns/firebaseHelpers";

import OptionsView from "./OptionsView";
import ModalHeader from "./ModalHeader";

const getPath = (day) => {
  const userId = getUserId();
  return `userData/${userId}/bukuHarian/${day}`;
};

export default class ModalView extends React.Component {
  state = {
    text: "",
    uri: "",
    emotionSelected: "grin",
  };

  // TODO: loading
  componentDidMount() {
    this.displayLastPhoto();
    this.displayLastEntry();
  }

  // Buggy for some reasonnnnn
  displayLastPhoto = async () => {
    const { day } = this.props;
    const path = getPath(day);
    const uri = await getImageURI(path);
    console.log("uri", uri);
    if (uri) this.setState({ uri });
  };

  displayLastEntry = async () => {
    const { day } = this.props;
    const path = getPath(day);
    const lastEntry = await getData(path);
    if (lastEntry) {
      const { text, emotionSelected } = lastEntry;
      this.setState({ text, emotionSelected });
    }
  };

  submit = () => {
    const { text, emotionSelected, uri } = this.state;
    const { day, toggleModal } = this.props;
    const path = getPath(day);
    setData(path, { text, emotionSelected });
    if (uri) uploadImage(path, uri);
    toggleModal();
  };

  delete = () => {
    const { day, toggleModal } = this.props;
    const path = getPath(day);
    deleteData(path);
    deleteImage(path);
    toggleModal();
  };

  handleTextChange = (text) => {
    this.setState({ text });
  };

  getPhoto = () => {
    Alert.alert(
      "Pilih metode",
      "untuk mengupload foto",
      [
        {
          text: "Pilih dari camera roll",
          onPress: async () => {
            console.log("running pillih");
            uri = await pickPhoto();
            console.log("pilih uri", uri);
            this.setState({ uri });
          },
        },
        {
          text: "Ambil foto",
          onPress: async () => {
            uri = await takePhoto();
            this.setState({ uri });
          },
        },
        { text: "Cancel", onPress: () => console.log("Cancelled") },
      ],
      { cancelable: true }
    );
  };

  selectEmotion = (emotionSelected) => {
    this.setState({ emotionSelected });
  };

  render() {
    const { text, emotionSelected, uri } = this.state;
    const { toggleModal, day, reload } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View>
            <ModalHeader currentDate={day} toggleModal={toggleModal} />

            {uri !== "" && <Image source={{ uri: uri }} style={styles.image} />}

            <OptionsView
              emotionSelected={emotionSelected}
              getPhoto={this.getPhoto}
              delete={this.delete}
              submit={this.submit}
              selectEmotion={this.selectEmotion}
              reload={reload}
            />

            <ScrollView keyboardDismissMode="interactive">
              <TextInput
                multiline={true}
                autoFocus={true}
                value={text}
                placeholder="Perasaanku hari ini..."
                onChangeText={(text) => this.handleTextChange(text)}
                style={[styles.input, { height: this.state.height }]}
              />
            </ScrollView>
          </View>
          <View style={{ flex: 1 }} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

ModalView.propTypes = {
  toggleModal: PropTypes.func,
};

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20, justifyContent: "flex-end" },
  image: {
    height: 250,
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
    fontFamily: "System",
  },
});
