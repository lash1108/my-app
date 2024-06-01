import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper'; // Importa los componentes de React Native Paper
import { publishPost, recoverData } from "../../api/posts";
import { API_URL } from "../../utils/constants";
import { log } from "expo/build/devtools/logger";

export default function Dashboard() {
    const [postData, setPostData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await recoverData();
            setPostData(data);
        }
        fetchData().then(r => log("ok"));
    }, []);

    const handleToggleView = () => {
        setShowForm(!showForm);
    };

    const handleFormSubmit = async () => {
        const result = await publishPost({
            "Titulo": titulo,
            "Mensaje": mensaje,
            "Fecha": new Date().toISOString(),
            "Recursos": []
        });
        if (result) {
            const updatedData = await recoverData();
            setPostData(updatedData);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Title style={styles.title}>Últimos Posts</Title>
          <Button
            mode="contained"
            onPress={handleToggleView}
            style={styles.toggleButton}
          >
            {showForm ? "Ver Posts" : "Crear Nuevo Post"}
          </Button>
          {showForm ? (
            <Card style={styles.card}>
              <Card.Content>
                <TextInput
                  label="Título"
                  value={titulo}
                  onChangeText={setTitulo}
                  style={styles.input}
                />
                <TextInput
                  label="Mensaje"
                  value={mensaje}
                  onChangeText={setMensaje}
                  multiline
                  style={styles.input}
                />
                <Button
                  mode="contained"
                  onPress={handleFormSubmit}
                  style={styles.submitButton}
                >
                  Publicar
                </Button>
              </Card.Content>
            </Card>
          ) : (
            postData && postData.map((post, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Title>{post.Titulo}</Title>
                  <Paragraph>{post.Fecha}</Paragraph>
                  <Paragraph>{post.Mensaje}</Paragraph>
                  {post.Recursos && post.Recursos.map((recurso, idx) => (
                    <Image
                      key={idx}
                      source={{ uri: `${API_URL}${recurso.url}` }}
                      style={styles.image}
                    />
                  ))}
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        padding: 20,
      },
      title: {
        marginBottom: 10,
      },
      toggleButton: {
        marginTop: 10,
      },
      card: {
        marginTop: 10,
      },
      input: {
        marginBottom: 10,
      },
      submitButton: {
        marginTop: 10,
      },
      image: {
        width: 200,
        height: 200,
        marginTop: 10,
      },
    });
    
