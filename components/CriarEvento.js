import  { useEffect } from 'react';
import { Text, StyleSheet,View, ScrollView,TouchableOpacity,Image,Button, Alert} from "react-native"
import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMap} from '@fortawesome/free-solid-svg-icons/faMap'
import { faUsers} from '@fortawesome/free-solid-svg-icons/faUsers'
import { faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark'
import { faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';






import { LinearGradient, } from 'expo-linear-gradient';
import  '@react-navigation/native';

import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';





export const CriarEvento = ({navigation}) =>{

    const [inputTitulo, setInputTitulo] = useState('')
    const [inputLocal, setInputLocal] = useState('')
    const [value, setValue] = useState(dayjs());

    const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos das permissões para acessar sua galeria de fotos.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const buttonHandle = ()=>{
    const neo4j = require('neo4j-driver')
     const driver = neo4j.driver('bolt://54.89.223.127:7687', neo4j.auth.basic('neo4j', 'runways-locomotives-shock'))
      
      const session = driver.session();
      const query = "CREATE(:evento {nome: $nome, local: $local, data: $data})"
        session
              .run(query, { nome: inputTitulo,local: inputLocal,data: String(value) })
              .then((result) => { 
                const mensagem = "cadastrado com sucesso"
                
                Alert.alert(
                  'Título do Alerta',
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

        
        <LinearGradient colors={['#fefffc', '#5eb6f5']} style={styles.container}>
                      
          
        <View style={{ flex: 1 }}>
        <View style={styles.tituloContainer}>
        
            <FontAwesomeIcon icon={faPlus} size={40} />
            <Text style={styles.titulo}>Criar Evento</Text>
            
          
        </View>
     

     
      <ScrollView style={{ flex: 1 }}>
        <View>
        <Text style={styles.text}>Titulo do evento:</Text>
                  <View style={styles.container1}>
                    <TextInput value={inputTitulo} onChangeText={(text)=>setInputTitulo(text)} style={styles.input} placeholder='Digite título do evento'></TextInput>
                  </View>
        </View>
        <View>
        <Text style={styles.text}>Local do evento:</Text>
                  <View style={styles.container1}>
                    <TextInput value={inputLocal} onChangeText={(text)=>setInputLocal(text)} style={styles.input} placeholder='Digite título do evento'></TextInput>
                  </View>
        </View>
        <View>
        <Text style={styles.text}>Data do Evento:</Text>
                  <View style={styles.container1}>
                  <DateTimePicker
                        value={value}
                        onValueChange={(date) => setValue(date)}
      />
                  </View>
        </View>
        <View>
        <Text style={styles.text}>Imagem do Evento:</Text>
                  <View style={styles.container1}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.button}  >
                  <Button title="Escolher uma imagem da galeria" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
                  </TouchableOpacity>
  
                  </View>
                  <Text style={styles.login} onPress={buttonHandle} >Cadastrar</Text>
        </View>
        
        
       
       
      </ScrollView>

      <View style={styles.menu}>

      
      <TouchableOpacity onPress={() => navigation.navigate('telaPrincipal')}>
                <FontAwesomeIcon icon={faMap} size={40} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=> navigation.navigate('conexoes')}>
            <FontAwesomeIcon icon={faUsers} size={40} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('salvos')}>
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
    container1:{
        borderBottomWidth:1,
        margin:10,
        alignItems:'center',
        flexDirection:'row',
        width:'95%',
        
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
