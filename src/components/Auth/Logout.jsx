import { StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function Logout({ authData }) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={authData.logout}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonText}
      >
        Cerrar Sesión
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContent: {
    height: 50, // Ajusta el tamaño del botón según tus necesidades
    width: '80%', // Ajusta el tamaño del botón según tus necesidades
  },
  buttonText: {
    fontSize: 16,
  },
});