import React from "react";
import { View, Button, StyleSheet } from "react-native";
import CustomTextInput from "../CustomTextInput";

export default function AddItemField({ value, onChangeText, addItem }) {
  return (
    <View style={styles.container}>
      <CustomTextInput
        fieldTitle="Lainnya"
        placeholder="Lainnya..."
        value={value}
        onChangeText={onChangeText}
      ></CustomTextInput>
      <View>
        <Button
          title="Tambah"
          onPress={addItem}
          style={styles.button}
          disabled={!value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textInput: {},
  button: {},
});
