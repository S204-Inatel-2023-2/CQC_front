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
import { RNS3 } from 'react-native-aws3';
import * as FileSystem from 'expo-file-system';






import { LinearGradient, } from 'expo-linear-gradient';
import  '@react-navigation/native';

import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';





export const CriarEvento = ({navigation}) =>{
  const [image, setImage] = useState(null);
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAVZUW77U3GWGTPEYA',
    secretAccessKey: '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',
    region: 'us-east-1', // por exemplo, 'us-east-1'
  });
  
  // Nome do bucket onde você deseja enviar a imagem
  const bucketName = 'armazenamentoneoj4imagens';
  
  // Nome do arquivo e o corpo da imagem que você quer enviar
  const fileName = 'teste.png'; // Substitua com o nome da sua imagem
  const fileContent = image; // Substitua com o conteúdo da sua imagem em formato de buffer ou arquivo
  
  // Parâmetros para o upload
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };
  

    const [inputTitulo, setInputTitulo] = useState('')
    const [inputLocal, setInputLocal] = useState('')
    const [value, setValue] = useState(dayjs());

    

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos das permissões para acessar sua galeria de fotos.');
      }
    })();
  }, []);
  let fileBase64 = null;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // Garante a melhor qualidade possível
    });

    if (!result.canceled) {
      const { uri } = result;
      setImage(uri);
      
  }
      // try {
      //    fileBase64 = await FileSystem.readAsStringAsync(uri, {
      //     encoding: FileSystem.EncodingType.Base64,
      //   });
      //   console.log('Versão base64 da imagem:', fileBase64);
        
        
      // } catch (error) {
      //   console.error('Erro ao ler imagem como base64:', error);
      // }
    
    
  };
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const buttonHandle = ()=>{
    const neo4j = require('neo4j-driver')
    const driver = neo4j.driver('bolt://3.238.39.27:7687', neo4j.auth.basic('neo4j', 'alleys-calibers-openings'))      
    const session = driver.session();
      const query = "CREATE(:evento {nome: $nome, local: $local, data: $data, imagem: $link})"
    let imagemLink =''

    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     console.error('Erro ao enviar a imagem:', err);
    //   } else {
    //     console.log('Imagem enviada com sucesso. URL:', data.Location);
    //     imagemLink = data.Location
    //     session
    //           .run(query, { nome: inputTitulo,local: inputLocal,data: String(value), link:data.Location })
    //           .then((result) => { 
    //             const mensagem = "cadastrado com sucesso"
                
    //             Alert.alert(
    //               'Título do Alerta',
    //               String(mensagem),
    //               [
    //                 { text: 'OK', onPress: () => console.log('OK Pressionado') },
    //               ]
    //             );
                
    //           })
    //           .catch((error) => {
    //             Alert.alert(
    //               'Título do Alerta',
    //               String(error),
    //               [
    //                 { text: 'OK', onPress: () => console.log('OK Pressionado') },
    //               ]
    //             );
    //           })
    //           .finally(() => {
    //             session.close();
    //             driver.close();
               
    //           });
    //   }
    // });
    //  sleep(2000); 
    //  console.log('link: '+imagemLink)
   
    
        
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
