
import React, { useState, useEffect } from "react";
import { Button, Text, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";
import _ from 'lodash';
const LugarList = (props) => {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    firebase.db.collection("lugares").onSnapshot((querySnapshot) => {
      const lugares = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, tipo, direccion } = doc.data();
        lugares.push({
          id: doc.id,
          nombre,
          tipo,
          direccion,
        });
      });

      setLugares(_.sortBy(lugares, 'tipo'));
    });
  }, []);

  const mostrarcabecera = (tipo, i) => {

    if (i > 0) {
      const tipoanterior = lugares[i - 1].tipo;
      if (tipoanterior !== tipo) {

        return (
          <>
            <Text >       </Text>
            <Text style={styles.separadorTexto}>{'    ' + tipo}</Text>
            <Text >       </Text>
          </>

        )
      }
    } else {
      return (
        <>
          <Text>       </Text>
          <Text style={styles.separadorTexto}>{'    ' + tipo}</Text>
          <Text>       </Text>
        </>

      )
    }
  }

  return (
    <ScrollView>

      <Button
        onPress={() => props.navigation.navigate("CreateLugarScreen")}
        title="Agregar Lugar"
        type="outline"
        size="small" 
        color="#996633" 
      />

      {lugares.map((lugar, i) => {
        return (
          <>
            {mostrarcabecera(lugar.tipo, i)}
            <ListItem
              key={lugar.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("LugarDetailScreen", {
                  lugarId: lugar.id,
                });
              }}
            >

              <ListItem.Content style= {styles.estilos}>
                <ListItem.Title>Lugar: </ListItem.Title>
                <ListItem.Subtitle>{lugar.nombre}</ListItem.Subtitle>
                <Text>                                   </Text>
                <ListItem.Title>Tipo Lugar: </ListItem.Title>
                <ListItem.Subtitle>{lugar.tipo}</ListItem.Subtitle>
                <Text>                                   </Text>
                <ListItem.Title>Direccion: </ListItem.Title>
                <ListItem.Subtitle>{lugar.direccion}</ListItem.Subtitle>
                <Text>                                   </Text>
              </ListItem.Content>

            </ListItem>
          </>
        );
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  estilos: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  separadorTexto: {
    color: '#621FF7',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignItems: "center",
    justifyContent: "center",
  },
 

})

export default LugarList;
