import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper'; // Importa los componentes de React Native Paper
import { publishPost, recoverData } from "../../api/posts";
import { API_URL } from "../../utils/constants";
import { log } from "expo/build/devtools/logger";
import NotesComponent from './notes/Notes';

export default function Dashboard() {
    const [postData, setPostData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <NotesComponent/>
        </View>
    );
}
