import { Image, View } from "react-native";
import React, { useState } from "react";
import { layoutStyles } from "../styles/index";
import logo from "../../assets/icon.png";
import FormRegister from "../components/Auth/FormRegister";
import FormLogin from "../components/Auth/FormLogin";

export default function Auth() {
    const [showLogin, setShowLogin] = useState(false);

    const changeForm = () => setShowLogin(!showLogin);
    return (
        <View style={layoutStyles.container}>
            <Image source={logo} style={layoutStyles.logo} />
            {showLogin ? <FormLogin changeForm={changeForm} /> : <FormRegister changeForm={changeForm} />}
        </View>
    );
}
