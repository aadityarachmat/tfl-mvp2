import React from "react";
import { TouchableOpacity, Image, StyleSheet, View, Text } from "react-native";

import PropTypes from "prop-types";

export default CardCamera = ({ getPhoto, uri }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => getPhoto()}>
      {(uri === "" && (
        <View>
          <Image
            source={require("../../assets/camera.png")}
            style={styles.camera}
          />
          <Text style={styles.text}>Pilih Foto</Text>
        </View>
      )) || <Image source={{ uri: uri }} style={styles.image} />}
    </TouchableOpacity>
  );
};

CardCamera.propTypes = {
  getPhoto: PropTypes.func,
  uri: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  camera: {
    height: 100,
    width: 100,
  },

  text: {
    textAlign: "center",
  },
});
