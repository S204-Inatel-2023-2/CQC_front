// Componente.js
import React,{useState} from 'react';

import { SafeAreaView, Text, StyleSheet,View, TextInput, Linking, Alert } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { LinearGradient, } from 'expo-linear-gradient';
import  '@react-navigation/native';
import listaConexao from '../lista/listaConexao';
import minhaLista from '../lista/listaEventos';


export const Card = ({navigation}) => {

  const buttonHandle = () => {
    Linking.openURL('https://davisbalbino.github.io/Cadastro/')
    .catch((err) => console.error('Erro ao abrir a página web:', err));
  };
    
    const [inputEmail, setInputEmail] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    

   
    

    const buttonLoginHandle = async() =>{
      const neo4j = require('neo4j-driver')
      const driver = neo4j.driver('bolt://54.89.223.127:7687', neo4j.auth.basic('neo4j', 'runways-locomotives-shock'))
      
      const session = driver.session();
      const query = 'MATCH (n:Usuario) WHERE n.email = $email AND n.senha = $senha RETURN n;';
        session
              .run(query, { email: inputEmail,senha: inputSenha })
              .then((result) => {
                const user = result.records.map(record => {
                  
                  return record.get('n').properties;
              });
                listaConexao.push(user)
                navigation.navigate('telaPrincipal')

              })
              .catch((error) => {
                Alert.alert(
                  'Erro ao fazer login',
                  String("Erro nas credenciais, tente novamente"),
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

    <SafeAreaView style={styles.safe}>
        <LinearGradient colors={['#fefffc', '#5eb6f5']} style={styles.container}>
          <View  style={styles.top}>
          <SafeAreaView style={styles.safe}>
                  
                  <View>
                    <Text style={styles.titulo}>Faça login no EventNow</Text>
                  </View>

                  <Text style={styles.text}>E-mail:</Text>
                  <View style={styles.container1}>
                    <FontAwesomeIcon icon={faUser} />
                    <TextInput value={inputEmail} onChangeText={(text)=>setInputEmail(text)} style={styles.input} placeholder='Digite seu e-mail'></TextInput>
                  </View>

                  <Text style={styles.text}>Senha:</Text>
                  <View style={styles.container1}>
                    <FontAwesomeIcon icon={faLock} />
                    <TextInput value={inputSenha} onChangeText={(text)=>setInputSenha(text)} style={styles.input} placeholder='Digite sua senha'></TextInput>
                  </View>

                
                <View style={styles.container2}>
                    <Text style={styles.login} onPress={buttonLoginHandle}>Login</Text>
                    <Text style={styles.cadastro} onPress={buttonHandle}>Cadastre-se</Text>
                  </View>
                  
                </SafeAreaView>
                      </View>
                    
        </LinearGradient>
      </SafeAreaView>
    
  );


  

}

const styles = StyleSheet.create({
  container2:{
    flexDirection:'column',
    alignItems:'center'
  },
  login:{
    backgroundColor:'#5eb6f5',
    textAlign:'center',
    justifyContent:'center',
    height: 40,
    marginTop:20,
    paddingTop:10,
    width:'40%',
    borderRadius:20,
  },
  cadastro:{
    backgroundColor:'#5eb6f5',
    textAlign:'center',
    justifyContent:'center',
    height: 40,
    marginTop:20,
    paddingTop:10,
    width:'40%',
    borderRadius:20,
  },
  safe: {
    flex:1
  },
  titulo: {
    textAlign:'center',
    fontSize:40,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:40,
  },
  text: {
    marginLeft: 12,
    fontSize:15,
    fontWeight:'bold'
  },
  input: {
    height: 40,
    marginLeft: 12,
    
    padding: 10,
    width:"100%",

  },
  container1:{
    borderBottomWidth:1,
    margin:10,
    alignItems:'center',
    flexDirection:'row',
    width:'95%',
    
  },
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
 
    


});