import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const NotesComponent = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items'); // Corregido
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result);
    }
  };

  const createFormData = async (name, description, imageUri) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    if (imageUri) {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const fileType = fileInfo.uri.split('.').pop();
      const fileName = fileInfo.uri.split('/').pop();

      const response = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const blob = new Blob([response], { type: `image/${fileType}` });

      formData.append('image', blob, fileName);
    }

    return formData;
  };

  const addItem = async () => {
    try {
      const formData = await createFormData(name, description, image);
      console.log(formData, image);
      const response = await axios.post(`http://localhost:5000/items`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setItems([...items, response.data]);
      setName('');
      setDescription('');
      setImage(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`); // Corregido
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = async () => {
    try {
      const formData = await createFormData(name, description, image);
      const response = await axios.put(`http://localhost:5000/items/${editingItemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setItems(items.map(item => (item._id === editingItemId ? response.data : item)));
      setName('');
      setDescription('');
      setImage(null);
      setEditingItemId(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const startEditItem = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditingItemId(item._id);
    setImage(null);
    setModalVisible(true);
  };

  const openModal = () => {
    setName('');
    setDescription('');
    setEditingItemId(null);
    setImage(null);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            {item.imageUrl && <Image source={{ uri: `http://localhost:5000${item.imageUrl}` }} style={styles.image} />} {/* Corregido */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => startEditItem(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item._id)} style={styles.button}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripcion"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title={editingItemId ? "Editar nota" : "Agregar nota"} onPress={editingItemId ? editItem : addItem} />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 6
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default NotesComponent;
