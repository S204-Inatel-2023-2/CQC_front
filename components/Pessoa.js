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
      

  return(
    
    <ImageBackground 
    source={imagem}
    imageStyle={{ borderRadius: 50}}
     style={styles.container}> 
        <View style={styles.info}>
          
        </View>
        

        <LinearGradient colors={['#FFF0','#FFF']} style={styles.container2}>
            <Text>{props.nome}</Text>
            <View style={styles.menu}>
      
              <TouchableOpacity >
                        <FontAwesomeIcon icon={faMap} size={40} />
                </TouchableOpacity>
                
                <TouchableOpacity >
                    <FontAwesomeIcon icon={faUsers} size={40} />
                </TouchableOpacity>

                <TouchableOpacity >
                    <FontAwesomeIcon icon={faBookmark} size={40} />
                </TouchableOpacity>
            </View>

          </LinearGradient>
        
     
       
    </ImageBackground>
    
  );


  

}

const styles = StyleSheet.create({
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