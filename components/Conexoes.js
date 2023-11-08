import react, { useEffect } from "react";

import { Text, StyleSheet,View, ScrollView,TouchableOpacity, Alert } from "react-native"
import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMap} from '@fortawesome/free-solid-svg-icons/faMap'
import { faUsers} from '@fortawesome/free-solid-svg-icons/faUsers'
import { faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'
import { useIsFocused } from '@react-navigation/native';



import { LinearGradient, } from 'expo-linear-gradient';
import  '@react-navigation/native';
import { Pessoa } from "./Pessoa";
import listaConexao from "../lista/listaConexao";


const image = {uri: 'data:image/jpeg;base64,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'};

export const Conexoes = ({navigation}, props) =>{
  const [carregarComponente, setCarregarComponente] = useState(false);
  
  let pessoasJsons = [
    { nome: 'João', sobrenome: 'Silva', email: 'joao@example.com' },
    { nome: 'Maria', sobrenome: 'Santos', email: 'maria@example.com' },
    { nome: 'Pedro', sobrenome: 'Rocha', email: 'pedro@example.com' },
    // Adicione mais pessoas conforme necessário
  ];
  
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Chame sua função aqui
      minhaFuncao();
    }
  }, [isFocused]);

  const  minhaFuncao = () => {
    const neo4j = require('neo4j-driver')
    const driver = neo4j.driver('bolt://54.89.223.127:7687', neo4j.auth.basic('neo4j', 'runways-locomotives-shock'))
     
     const session = driver.session();
     const query = "MATCH (n:Usuario) RETURN n "
       session
             .run(query)
             .then(result => {
                const users = result.records.map(record => {
                  
                  return record.get('n').properties;
              });
              
              pessoasJson = (users)
              
              console.log(pessoasJson) // Aqui você tem os usuários como objetos
              setCarregarComponente(true);
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
  };
 

    return(

        
        <LinearGradient colors={['#fefffc', '#5eb6f5']} style={styles.container}>
                      
          
        <View style={{ flex: 1 }}>
        <View style={styles.tituloContainer}>
        <FontAwesomeIcon icon={faUsers} size={40}/>

          <Text style={styles.titulo}>Conexões</Text>
          
        </View>
     

      {/* Conteúdo rolável */}
      <ScrollView style={{ flex: 1 }}>
       
        {carregarComponente ? (
          
        pessoasJson.map(pessoa => (
          <Pessoa imagem={'https://scontent.fnat1-1.fna.fbcdn.net/v/t39.30808-6/365428613_6509308685816133_7421590953227553555_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeGP__yAb8HpIhtQSlUNtOIEUhcHg5_r8uxSFweDn-vy7El27cEjxenmJkpdyYzfvbP-2fud0S604XGLq04CBlr2&_nc_ohc=EzrtGnBBNuIAX8x7bv5&_nc_ht=scontent.fnat1-1.fna&oh=00_AfAbBj3H0d4s6jacUc4IKsXIVm3fOZkkN7Ic5D2ByE598w&oe=6520FBB2'} nome = {pessoa.nome} ></Pessoa>
        ))
      ) : (
        <Text>Carregando...</Text>
      )}
        {}
        
        
         
       
       
      </ScrollView>

      <View style={styles.menu}>

      
          <TouchableOpacity onPress={() => navigation.navigate('telaPrincipal')}>
                    <FontAwesomeIcon icon={faMap} size={40} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=> navigation.navigate('conexoes')}>
                <FontAwesomeIcon icon={faUsers} size={40} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate('salvos')} >
                <FontAwesomeIcon icon={faBookmark} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('criarEvento')}>
            <FontAwesomeIcon icon={faPlus} size={40} />
        </TouchableOpacity>
        </View>
     </View>
        </LinearGradient>
     
    
  );


  

}

const styles = StyleSheet.create({
  
  tituloContainer:{
    
    justifyContent:  'flex-start',
    alignItems:'center',
    
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20,
    

  },
 
  titulo:{
    textAlign:'left',
    fontSize:40,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:40,
    marginHorizontal:10
  },
  container: {
    minWidth:"100%",
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop:30,
    marginBottom:10,

  },
  menu:{ 
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'space-around', 
    alignItems: 'center', 
    flexDirection:'row',
    paddingTop:10,
    
    borderRadius:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5 // Adiciona sombra no Android (opcional)
  }
  
  
 
    


}
    )
