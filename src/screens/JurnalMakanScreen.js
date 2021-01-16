import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import Card from "../components/Card/Card";

import getDate from "../helperfns/date";
import { getUserId } from "../helperfns/InitializeUser";

const SARAPANKU_DEFAULT = {
  Mie: { value: "Mie", selected: false },
  Nasi_Goreng: { value: "Nasi Goreng", selected: false },
  Telur: { value: "Telur", selected: false },
};

export default class JurnalMakanScreen extends React.Component {
  constructor(props) {
    super(props);
    const userId = getUserId();
    const date = getDate();
    const itemsPath = `userData/${userId}/jurnal/${date}/makan`;
    const imagesPath = `userData/${userId}/jurnal/${date}/makan`;
    this.state = {
      sarapanku: SARAPANKU_DEFAULT,
      makanSiangku: SARAPANKU_DEFAULT,
      makanMalamku: SARAPANKU_DEFAULT,
      itemsPath: itemsPath,
      imagesPath: imagesPath,
    };
  }

  render() {
    const {
      sarapanku,
      makanSiangku,
      makanMalamku,
      itemsPath,
      imagesPath,
    } = this.state;

    const sarapankuItemsPath = `${itemsPath}/sarapanku`;
    const sarapankuImagesPath = `${imagesPath}/sarapanku`;
    const makanSiangkuItemsPath = `${itemsPath}/makanSiangku`;
    const makanSiangkuImagesPath = `${imagesPath}/makanSiangku`;
    const makanMalamkuItemsPath = `${itemsPath}/makanMalamku`;
    const makanMalamkuImagesPath = `${imagesPath}/makanMalamku`;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <Card
            title="Sarapanku..."
            items={sarapanku}
            itemsPath={sarapankuItemsPath}
            imagesPath={sarapankuImagesPath}
          />
          <Card
            title="Makan Siangku..."
            items={makanSiangku}
            itemsPath={makanSiangkuItemsPath}
            imagesPath={makanSiangkuImagesPath}
          />
          <Card
            title="Makan Malamku"
            items={makanMalamku}
            itemsPath={makanMalamkuItemsPath}
            imagesPath={makanMalamkuImagesPath}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
