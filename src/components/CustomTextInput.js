import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const CustomTextInput = props => {
  return (
    <View style={[styles.container, props.style]}>
      {props.value !== "" && (
        <Text style={styles.fieldTitle}>{props.fieldTitle}</Text>
      )}
      <TextInput
        {...props}
        autoCapitalize="none"
        style={styles.textField}
      ></TextInput>
    </View>
  );
};

export default CustomTextInput;

styles = StyleSheet.create({
  textField: {
    borderBottomWidth: 1,
    borderColor: "#aaaaaa",
    paddingBottom: 10,
    marginBottom: 20,
    marginTop: 8
  },
  fieldTitle: {
    color: "darkblue"
  },
  container: {
    width: "64%"
  }
});
