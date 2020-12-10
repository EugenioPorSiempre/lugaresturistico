import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


// Components
import CreateLugarScreen from "./screens/CreateLugarScreen";
import LugarDetailScreen from "./screens/LugarDetailScreen";
import LugarList from "./screens/LugarList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#DAA520",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="LugarList"
        component={LugarList}
        options={{ title: "Lugares" }}
      />
    <Stack.Screen
        name="CreateLugarScreen"
        component={CreateLugarScreen}
        options={{ title: "Agregar lugar" }}
      />
  
      <Stack.Screen
        name="LugarDetailScreen"
        component={LugarDetailScreen}
        options={{ title: "Detalle del lugar" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});