import React from "react";
import { Image, StyleSheet } from "react-native";

// call function where default case -> default icon last
export default function getIcon(name) {
  let icon = getActivityIcon(name);
  if (!icon) {
    icon = getFoodIcon(name);
  }
  return icon;
}

export function getActivityIcon(name) {
  switch (name) {
    case "Sendiri":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/sendiri.png")}
        />
      );
    case "Teman":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/teman.png")}
        />
      );
    case "Orang Tua":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/orangTua.png")}
        />
      );
    case "MK LAP":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/mkLAP.png")}
        />
      );
    case "Dokter":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/dokter.png")}
        />
      );
    case "Guru":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/guru.png")}
        />
      );
    case "Jalan Jalan":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/jalanJalan.png")}
        />
      );
    case "Olahraga":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/olahraga.png")}
        />
      );
    case "Membaca":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/membaca.png")}
        />
      );
    case "Belajar":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/belajar.png")}
        />
      );
    case "Main Dengan Teman":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/mainDenganTeman.png")}
        />
      );
    case "Tidur Siang":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/tidurSiang.png")}
        />
      );
    case "Pesta":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/pesta.png")}
        />
      );
    case "Main Game":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/mainGame.png")}
        />
      );
    case "Bantu Orang Tua":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/bantuOrangTua.png")}
        />
      );
    case "Sekolah":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/sekolah.png")}
        />
      );
    case "Rumah Teman":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/rumahTeman.png")}
        />
      );
    case "Rumah Sendiri":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/rumahSendiri.png")}
        />
      );
    case "Mall":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/mall.png")}
        />
      );
    case "Rumah Sakit":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/rumahSakit.png")}
        />
      );
    case "Taman":
      return (
        <Image
          style={styles.image}
          source={require("../assets/aktivitas/taman.png")}
        />
      );
    default:
      return null;
  }
}

export function getFoodIcon(name) {
  switch (name) {
    case "Mie":
      return (
        <Image
          style={styles.image}
          source={require("../assets/makanan/mie.png")}
        />
      );
    case "Nasi Goreng":
      return (
        <Image
          style={styles.image}
          source={require("../assets/makanan/nasiGoreng.png")}
        />
      );
    case "Telur":
      return (
        <Image
          style={styles.image}
          source={require("../assets/makanan/telur.png")}
        />
      );
    case "Nasi":
      return (
        <Image
          style={styles.image}
          source={require("../assets/makanan/nasi.png")}
        />
      );
    case "Ikan":
      return (
        <Image
          style={styles.image}
          source={require("../assets/makanan/ikan.png")}
        />
      );
    case "Sayuran":
      return (
        <Image
          style={styles.image}
          source={require("../assets/makanan/sayuran.png")}
        />
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
  },
});
