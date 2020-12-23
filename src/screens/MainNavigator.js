import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen.js";
import BukuHarianScreen from "./BukuHarianScreen.js";
import JurnalScreen from "./JurnalScreen";
import JurnalAktivitasScreen from "./JurnalAktivitasScreen.js";
import JurnalMakanScreen from "./JurnalMakanScreen.js";
import MetrikBulananScreen from "./MetrikBulananScreen.js";
import ProfileScreen from "./ProfileScreen.js";

const Stack = createStackNavigator();

export default MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Buku Harian" component={BukuHarianScreen} />
    <Stack.Screen name="Jurnal" component={JurnalScreen} />
    <Stack.Screen name="Jurnal Aktivitas" component={JurnalAktivitasScreen} />
    <Stack.Screen name="Jurnal Makan" component={JurnalMakanScreen} />
    <Stack.Screen name="Metrik" component={MetrikBulananScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);
