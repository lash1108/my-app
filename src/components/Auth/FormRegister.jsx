import { View } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { formStyles } from "../../styles";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function FormRegister({ changeForm }) {
    const formValidation = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            console.log(formData);
        },
    });

    function initialValues() {
        return {
            email: "",
            userName: "",
            password: "",
            repeatPassword: "",
        };
    }

    function validationSchema() {
        return {
            email: Yup.string().email().required("Ingrese el correo"),
            userName: Yup.string().required("Ingrese un nombre de usuario"),
            password: Yup.string().required("Ingrese una contraseña"),
            repeatPassword: Yup.string()
                .required("Repita la contraseña")
                .oneOf([Yup.ref("password")], true),
        };
    }

    return (
        <View>
            <TextInput onChangeText={(text) => formValidation.setFieldValue("email", text)} label="Correo electrónico" style={formStyles.input} required error={formValidation.errors.email} value={formValidation.values.email} />
            <TextInput onChangeText={(text) => formValidation.setFieldValue("userName", text)} label="Nombre de usuario" style={formStyles.input} required error={formValidation.errors.userName} value={formValidation.values.userName} />
            <TextInput onChangeText={(text) => formValidation.setFieldValue("password", text)} label="Contraseña" style={formStyles.input} secureTextEntry error={formValidation.errors.password} value={formValidation.values.password} />
            <TextInput onChangeText={(text) => formValidation.setFieldValue("repeatPassword", text)} label="Repetir contraseña" style={formStyles.input} secureTextEntry error={formValidation.errors.repeatPassword} value={formValidation.values.repeatPassword} />
            <Button onPress={formValidation.handleSubmit} mode="contained" style={formStyles.btnSuccess}>
                Registrarse
            </Button>
            <Button onPress={changeForm} mode="text" style={formStyles.btnText} labelStyle={formStyles.btnTextLabel}>
                Iniciar sesión
            </Button>
        </View>
    );
}
