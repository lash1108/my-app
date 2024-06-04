import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../api/users';
import useAuth from "../../hooks/useAuth";
import { formStyles } from '../../styles';

export default function LoginForm({ changeForm }) {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log(formData);
            try {
                const response = await loginApi(formData);
                if (response.statusCode) throw 'Error';
                login(response);
            } catch (error) {
                console.log(error);
            }
        }
    });

    function initialValues() {
        return {
            identifier: "",
            password: ""
        };
    }

    function validationSchema() {
        return {
            identifier: Yup.string().required(true),
            password: Yup.string().required(true)
        };
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Correo electrónico o Username"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('identifier', text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput
                label="Contraseña"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}>
                Iniciar Sesión
            </Button>
            <Button
                mode="text"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}>
                Registrarse
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});
