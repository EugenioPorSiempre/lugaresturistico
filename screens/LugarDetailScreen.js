import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from "../database/firebase";

const LugarDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    tipo: "",
    direccion: "",
  };

  const [lugar, setLugar] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setLugar({ ...lugar, [prop]: value });
  };

  const obtenerLugarporId = async (id) => {
    const dbRef = firebase.db.collection("lugares").doc(id);
    const doc = await dbRef.get();
    const lugar = doc.data();
    setLugar({ ...lugar, id: doc.id });
    setLoading(false);
  };

  const eliminarLugar = async () => {
    setLoading(true);
    const dbRef = firebase.db
      .collection("lugares")
      .doc(props.route.params.lugarId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("LugarList");
  };

  const actualizarLugar = async () => {
    const lugarRef = firebase.db.collection("lugares").doc(lugar.id);
    await lugarRef.set({
      nombre: lugar.nombre,
      tipo: lugar.tipo,
      direccion: lugar.direccion,
    });
    setLugar(initialState);
    props.navigation.navigate("LugarList");
  };

  useEffect(() => {
    obtenerLugarporId(props.route.params.lugarId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Nombre"
          style={styles.inputGroup}
          value={lugar.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="tipo"
          style={styles.inputGroup}
          value={lugar.tipo}
          onChangeText={(value) => handleTextChange(value, "tipo")}
        />
      </View>
      <View>
        <TextInput
          placeholder="direccion"
          style={styles.inputGroup}
          value={lugar.direccion}
          onChangeText={(value) => handleTextChange(value, "direccion")}
        />
      </View>
      <View style={styles.btn}>
        <Button title="Eliminar" onPress={() => eliminarLugar()} color="#996633" />
      </View>
      <View>
        <Button title="Actualizar" onPress={() => actualizarLugar()} color="#996633" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default LugarDetailScreen;
