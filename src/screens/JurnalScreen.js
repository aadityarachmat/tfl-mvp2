import React from "react";
import { View } from "react-native";

import JurnalCards from "../components/Jurnal/JurnalCards";
import {
  AktivitasButton,
  MakanButton,
} from "../components/Jurnal/JurnalButtons";

export default class JurnalScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <JurnalCards />
        <MakanButton onPress={() => navigation.push("Jurnal Makan")} />
        <AktivitasButton onPress={() => navigation.push("Jurnal Aktivitas")} />
      </View>
    );
  }
}
