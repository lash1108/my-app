import {Image, View} from 'react-native';
import React, {useState} from 'react';
import {layoutStyles} from '../styles/index';
import FI from '../../assets/images.png';
import RegisterForm from '../components/Auth/RegisterForm';
import LoginForm from '../components/Auth/LoginForm';

export default function Auth() {
    const [showLogin, setShowLogin] = useState(false)
    const changeForm = () => setShowLogin(!showLogin)

    return (
        <View style={layoutStyles.container}>
            <Image
                source={FI}
                style={layoutStyles.logo}
            />
            {showLogin ?
                <LoginForm changeForm={changeForm}/> :
                <RegisterForm changeForm={changeForm}/>}
        </View>
    );
}