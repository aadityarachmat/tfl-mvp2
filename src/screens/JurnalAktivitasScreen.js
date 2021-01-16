import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import Card from "../components/Card/Card";

import getDate from "../helperfns/date";
import { getUserId } from "../helperfns/InitializeUser";

const BERSAMA_DEFAULT = {
  Sendiri: { value: "Sendiri", selected: false },
  Teman: { value: "Teman", selected: false },
  Orang_Tua: { value: "Orang Tua", selected: false },
  MK_LAP: { value: "MK LAP", selected: false },
  Dokter: { value: "Dokter", selected: false },
  Guru: { value: "Guru", selected: false },
};

const BERAKTIVITAS_DEFAULT = {
  Jalan_Jalan: { value: "Jalan Jalan", selected: false },
  Olahraga: { value: "Olahraga", selected: false },
  Membaca: { value: "Membaca", selected: false },
  Belajar: { value: "Belajar", selected: false },
  Main_Dengan_Teman: { value: "Main Dengan Teman", selected: false },
  Tidur_Siang: { value: "Tidur Siang", selected: false },
  Pesta: { value: "Pesta", selected: false },
  Main_Game: { value: "Main Game", selected: false },
  Bantu_Orang_Tua: { value: "Bantu Orang Tua", selected: false },
};

const BERADA_DEFAULT = {
  Sekolah: { value: "Sekolah", selected: false },
  Rumah_Teman: { value: "Rumah Teman", selected: false },
  Rumah_Sendiri: { value: "Rumah Sendiri", selected: false },
  Mall: { value: "Mall", selected: false },
  Rumah_Sakit: { value: "Rumah Sakit", selected: false },
  Taman: { value: "Taman", selected: false },
};

export default class JurnalAktivitasScreen extends React.Component {
  constructor(props) {
    super(props);
    const userId = getUserId();
    const date = getDate();
    const itemsPath = `userData/${userId}/jurnal/${date}/aktivitas`;
    const imagesPath = `userData/${userId}/jurnal/${date}/aktivitas`;
    this.state = {
      bersama: BERSAMA_DEFAULT,
      beraktivitas: BERAKTIVITAS_DEFAULT,
      berada: BERADA_DEFAULT,
      itemsPath: itemsPath,
      imagesPath: imagesPath,
    };
  }

  render() {
    const { bersama, beraktivitas, berada, itemsPath, imagesPath } = this.state;

    const bersamaItemsPath = `${itemsPath}/bersama`;
    const bersamaImagesPath = `${imagesPath}/bersama`;
    const beraktivitasItemsPath = `${itemsPath}/beraktivitas`;
    const beraktivitasImagesPath = `${imagesPath}/beraktivitas`;
    const beradaItemsPath = `${itemsPath}/berada`;
    const beradaImagesPath = `${imagesPath}/berada`;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <Card
            title="Hari ini saya bersama..."
            items={bersama}
            itemsPath={bersamaItemsPath}
            imagesPath={bersamaImagesPath}
          />
          <Card
            title="Hari ini saya beraktivitas..."
            items={beraktivitas}
            itemsPath={beraktivitasItemsPath}
            imagesPath={beraktivitasImagesPath}
          />
          <Card
            title="Hari ini saya berada di..."
            items={berada}
            itemsPath={beradaItemsPath}
            imagesPath={beradaImagesPath}
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
