import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";

export default EmotionsView = ({ onSelectEmotion }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelectEmotion("grin")}>
        <Emoji name="grin" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("joy")}>
        <Emoji name="joy" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("blush")}>
        <Emoji name="blush" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("heart_eyes")}>
        <Emoji name="heart_eyes" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("sunglasses")}>
        <Emoji name="sunglasses" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("sleepy")}>
        <Emoji name="sleepy" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("neutral_face")}>
        <Emoji name="neutral_face" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("disappointed")}>
        <Emoji name="disappointed" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("sob")}>
        <Emoji name="sob" style={{ fontSize: 30 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectEmotion("rage")}>
        <Emoji name="rage" style={{ fontSize: 30 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
