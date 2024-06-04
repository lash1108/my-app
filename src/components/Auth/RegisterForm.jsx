import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../api/users';
import { formStyles } from '../../styles';

export default function RegisterForm({ changeForm }) {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log(formData);
            try {
                await registerApi(formData);
                console.log('Usuario registrado...');
                changeForm(); 
            } catch (error) {
                console.log(error);
            }
        }
    });

    function initialValues() {
        return {
            email: "",
            username: "",
            password: "",
            repeatPassword: ""
        };
    }

    function validationSchema() {
        return {
            email: Yup.string().email().required(true),
            username: Yup.string().required(true),
            password: Yup.string().required(true),
            repeatPassword: Yup.string().required(true).oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        };
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Correo electrónico"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />

            <TextInput
                label="Nombre de usuario"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />

            <TextInput
                label="Contraseña"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <TextInput
                label="Repetir contraseña"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />

            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}>
                Registrarse
            </Button>

            <Button
                mode="text"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={changeForm}>
                Iniciar sesión
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});
