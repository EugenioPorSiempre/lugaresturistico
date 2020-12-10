import React, { useState } from 'react';
import {
    Button,
    View,
    StyleSheet,
    TextInput,
    ScrollView
} from 'react-native';
import firebase from '../database/firebase';

const CreateLugarScreen = (props) => {
    const initalState = {
        nombre: "",
        tipo: "",
        direccion: "",
    }

    const [state, setState] = useState(initalState);
    const handleChangeText = (value, nombre) => {
        setState({ ...state, [nombre]: value });
    };

    const nuevolugar = async () => {
        if (state.nombre === "") {
            alert("porfavor escriba algo");
        }
        else {
            try {
                await firebase.db.collection("lugares").add({
                    nombre: state.nombre,
                    tipo: state.tipo,
                    direccion: state.direccion,

                });

                props.navigation.navigate("LugarList");
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.inputGroup}>
                <TextInput placeholder=" Escriba el nombre del lugar"
                    onChangeText={(value) => handleChangeText(value, "nombre")}
                    value={state.nombre} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Escriba el tipo de lugar"
                    onChangeText={(value) => handleChangeText(value, "tipo")}
                    value={state.tipo} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Escriba la direccion del lugar"
                    onChangeText={(value) => handleChangeText(value, "direccion")}
                    value={state.direccion} />
            </View>
            <View style={styles.button}>
                <Button title="Guardar" onPress={() => nuevolugar()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
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
    

})

export default CreateLugarScreen
