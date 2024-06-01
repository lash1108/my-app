import { StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function Logout({ authData }) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={authData.logout}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Cerrar Sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Fondo claro para el contenedor
    position: 'relative', // Asegura que el contenedor sea relativo para que el botón se posicione dentro de él
  },
  button: {
    backgroundColor: 'red', // Color de fondo del botón
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  buttonText: {
    color: 'white', // Color del texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
});
