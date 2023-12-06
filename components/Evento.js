// Componente.js
import React,{useState} from 'react';

import {  Text, StyleSheet,View,ImageBackground } from "react-native"

import { TouchableOpacity } from 'react-native-gesture-handler';
import listaConexao from '../lista/listaConexao';
export const Evento = (props) => {

  const imagem = {uri: props.imagem}

  const participarHandle = () => {
    console.log(props.nome)
    emailConexao = listaConexao[0][0]['email'];
    console.log(emailConexao)
    const neo4j = require('neo4j-driver')
    const driver = neo4j.driver('bolt://3.238.39.27:7687', neo4j.auth.basic('neo4j', 'alleys-calibers-openings'))      
      const session = driver.session();
      const query = "MATCH (u:Usuario {email: $nome}) MATCH (e:evento {nome: $nome_evento}) CREATE (u)-[:PARTICIPA]->(e)"
        session
              .run(query, { nome: emailConexao, nome_evento: props.nome })
              .then((result) => { 
                console.log(props.nome)
                
              })
              .catch((error) => {
                
              })
              .finally(() => {
                session.close();
                driver.close();
               
              });

  }


  return(

    <View style={styles.container}> 
        <ImageBackground imageStyle={{ borderRadius: 20}} source={imagem} style={styles.image}>
          <View>
            
          </View>
          <View ><Text style={styles.titulo}> {props.nome}</Text></View>
          <View style={styles.conteudo}> 
            
            
            {
            props.carregar?(<TouchableOpacity onPress={participarHandle}>
              
              <Text style={styles.texto }>Participar</Text>
            </TouchableOpacity>):(null)
              
            }
            
          </View>

        </ImageBackground>
        
       
    </View>
    
  );


  

}

const styles = StyleSheet.create({
 titulo:{
  textAlign:'center',
  top:10,
  fontSize: 20,
  backgroundColor:'white',
  width:'auto',
  borderRadius:15,
 },
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
    backgroundColor:'#FFF',
    
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