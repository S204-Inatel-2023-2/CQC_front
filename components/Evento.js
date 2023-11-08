// Componente.js
import React,{useState} from 'react';

import {  Text, StyleSheet,View,ImageBackground } from "react-native"

import { TouchableOpacity } from 'react-native-gesture-handler';
import minhaLista from '../lista/listaEventos';
export const Evento = (props) => {

  const imagem = {uri: props.imagem}

  const participarHandle = () => {
    const teste = {
      image : imagem
    }
    minhaLista.push(teste)
    alert(minhaLista)
  }

  return(

    <View style={styles.container}> 
        <ImageBackground imageStyle={{ borderRadius: 20}} source={imagem} style={styles.image}>
          <View>
            <Text></Text>
          </View>
          <View style={styles.conteudo}> 
            <Text>{props.nome}</Text>
            <TouchableOpacity onPress={participarHandle}>
              <Text style={styles.texto }>Participar</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
        
       
    </View>
    
  );


  

}

const styles = StyleSheet.create({
  container:{
    borderRadius:20,
  },
  conteudo:{
    marginTop:'50%',
    borderWidth:1,
    borderRadius:5,
    flexDirection:'column',
    justifyContent:"flex-end",
    height:'auto',
    width:'20%',
    marginBottom:10,
    marginLeft:10,
    backgroundColor:'#FFF'
  },
  image: {
    
    justifyContent: 'center',
    height:200,
    margin:10,
    borderRadius:20,
  },
  texto:{

  }

});