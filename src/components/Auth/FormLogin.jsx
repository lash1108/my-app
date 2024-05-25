import { View } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { formStyles } from "../../styles";


export default function FormLogin({ changeForm }) {

    return (
        <View>
            <TextInput label="Correo electrónico" style={formStyles.input} />
            <TextInput label="Contraseña" style={formStyles.input} secureTextEntry />
            <Button mode="contained" style={formStyles.btnSuccess}>
                Iniciar sesión
            </Button>
            <Button onPress={changeForm} mode="text" style={formStyles.btnText} labelStyle={formStyles.btnTextLabel}>
                Registrarse{" "}
            </Button>
        </View>
    );
}
