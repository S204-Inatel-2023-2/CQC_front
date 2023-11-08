import react from "react";
import { Text, StyleSheet,View, ScrollView,TouchableOpacity} from "react-native"
import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMap} from '@fortawesome/free-solid-svg-icons/faMap'
import { faUsers} from '@fortawesome/free-solid-svg-icons/faUsers'
import { faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'



import { LinearGradient, } from 'expo-linear-gradient';
import  '@react-navigation/native';
import { Evento } from "./Evento";
import minhaLista from "../lista/listaEventos";



export const Salvos = ({navigation}) =>{

  var images_src = [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300"
  ];

    return(

        
        <LinearGradient colors={['#fefffc', '#5eb6f5']} style={styles.container}>
                      
          
        <View style={{ flex: 1 }}>
        <View style={styles.tituloContainer}>
        <FontAwesomeIcon icon={faMap} size={40}/>

          <Text style={styles.titulo}>Eventos Salvos</Text>
          
        </View>
     

      {/* Conteúdo rolável */}
      <ScrollView style={{ flex: 1 }}>

        {/* Seu conteúdo aqui */}
        {images_src.map(imagens => (
          <Evento imagem = {imagens}/>
        ))}
       
       
      </ScrollView>

      <View style={styles.menu}>

      
      <TouchableOpacity onPress={() => navigation.navigate('telaPrincipal')}>
                <FontAwesomeIcon icon={faMap} size={40} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=> navigation.navigate('conexoes')}>
            <FontAwesomeIcon icon={faUsers} size={40} />
        </TouchableOpacity>

        <TouchableOpacity >
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
