import { StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function Logout({ authData }) {
  return (
    <View style={styles.container}>
      <Button
      width="100%"
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
    marginTop: 80,
  },
  buttonContent: {
    height: 50, 
    width: 200, 
  },
  buttonText: {
    fontSize: 16,
  },
});