// Componente.js
import React,{useState} from 'react';
import { Image } from 'react-native-svg';
import { SafeAreaView, Text, StyleSheet,View, TextInput, Linking, Alert,ImageBackground } from "react-native"

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { LinearGradient, } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMap} from '@fortawesome/free-solid-svg-icons/faMap'
import { faUsers} from '@fortawesome/free-solid-svg-icons/faUsers'
import { faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark'




export const Pessoa = (props) => {

    const imagem = {uri: props.imagem}
    const showEvents = () =>{
      
      const neo4j = require('neo4j-driver')
      const driver = neo4j.driver('bolt://3.238.39.27:7687', neo4j.auth.basic('neo4j', 'alleys-calibers-openings'))      
      const session = driver.session();
      const query = "MATCH(u:Usuario {email: $email})-[:PARTICIPA]->(n:evento) return n"
      session
              .run(query, { email: props.email })
              .then((result) => { 
                const users = result.records.map(record => {
                  
                  return record.get('n').properties;
              })
               let mensagem = ''
                console.log(users)
                for(let i = 0; i< users.length; i++){
                  mensagem = mensagem + users[i]['nome']+'\n'
                }
                Alert.alert(
                  'Eventos que irei Participar',
                  String(mensagem),
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressionado') },
                  ]
                );
                
              })
              .catch((error) => {
                Alert.alert(
                  'Título do Alerta',
                  String(error),
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressionado') },
                  ]
                );
              })
              .finally(() => {
             
                session.close();
                driver.close();
               
              });
    }

  return(
    
    <ImageBackground 
    source={imagem}
    imageStyle={{ borderRadius: 50}}
     style={styles.container}> 
        <View style={styles.info}>
          
        </View>
        

        <LinearGradient colors={['#FFF0','#FFF']} style={styles.container2}>
            <Text style={styles.nomeTitulo}>{props.nome} {props.sobrenome}</Text>
            <View style={styles.menu}>
      
              
                
                

                <TouchableOpacity onPress={showEvents} >
                    <FontAwesomeIcon  icon={faBookmark} size={40} />
                </TouchableOpacity>
            </View>

          </LinearGradient>
        
     
       
    </ImageBackground>
    
  );


  

}

const styles = StyleSheet.create({
  nomeTitulo:{
    marginLeft:30,
    fontSize:20,
  },
  container:{
    borderWidth:1,
    borderRadius:50  ,
    flexDirection:'column',
    justifyContent:"flex-end",
    height:400,
    marginBottom:10
  },
  container2:{
    flex:0.6,
    justifyContent:'flex-end',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50
  },
  info:{
    textAlign:'center',
  },
  text:{
    textAlign:'center',
  },
  imagem:{
    width:"50%",
  },
  menu:{
    height: 60,
    justifyContent: 'space-around', 
    alignItems: 'center', 
    flexDirection:'row',
    paddingTop:10,
    marginHorizontal:15,
    marginBottom:20,
  }
  
});