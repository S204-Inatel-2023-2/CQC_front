import React from "react"
import { SafeAreaView, Text, StyleSheet,View, TextInput } from "react-native"

import { AntDesign } from '@expo/vector-icons'; 
import { Card } from './components/Card'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TelaPrincipal } from "./components/TelaPrincipal";
import { Conexoes } from "./components/Conexoes";
import { Salvos } from "./components/Salvos";
import { CriarEvento } from "./components/CriarEvento";
import { Cadastro } from "./components/Cadastro";


const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Card.js">
        <Stack.Screen options={{ headerShown: false }} name='login' component={Card} />
        <Stack.Screen options={{ headerShown: false }} name='telaPrincipal' component={TelaPrincipal} />
        <Stack.Screen options={{ headerShown: false }} name='conexoes' component={Conexoes} />
        <Stack.Screen options={{ headerShown: false }} name='salvos' component={Salvos} />
        <Stack.Screen options={{ headerShown: false }} name='criarEvento' component={CriarEvento} />
        <Stack.Screen options={{ headerShown: false }} name='cadastro' component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
      
    
    
  )

}

const styles = StyleSheet.create({
  safe:{
    flex:1
  },
  container: {
    minWidth:"100%",
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop:30,
    marginBottom:10,

  },
  top: {
    flex: .5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#FFF',
    
  },
  

});

export default App