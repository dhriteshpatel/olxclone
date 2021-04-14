import React,{useState} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TextInput, Button} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const CreateAdScreen = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const postData = async () =>{
        try{
            await firestore().collection('ads')
            .add({
                name,
                desc,
                year,
                phone,
                price,
                image, 
                uid: auth().currentUser.uid    
            })
            Alert.alert('Your ad posted!')
        } catch(err){
          Alert.alert('something went wrong. try again')
        }

    }

    const openCamera = ()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
            //    console.log(fileobj)
            const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.uri)
            uploadTask.on('state_changed', 
            (snapshot) => {
               
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 if(progress==100){alert("uploaded")}
            }, 
            (error) => {
               alert("something went wrong")
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                   
                    setImage(downloadURL)
                });
            }
            );
           })
       }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Ad!</Text>
            <TextInput
                 label="Ad title"
                 value={name}
                 mode='outlined'
                 onChangeText={text=> setName(text)} />
            <TextInput
                 label="Describe what you are selling"
                 value={desc}
                 mode='outlined'
                 multiline={true}
                 numberOfLines={3}
                 onChangeText={text=> setDesc(text)} />
            <TextInput
                 label="Year of purchase"
                 value={year}
                 keyboardType='numeric'
                 mode='outlined'
                 onChangeText={text=> setYear(text)} />
            <TextInput
                 label="Price in INR"
                 value={price}
                 keyboardType='numeric'
                 mode='outlined'
                 onChangeText={text=> setPrice(text)} />
            <TextInput
                 label="Your contact number"
                 value={phone}
                 keyboardType='numeric'
                 mode='outlined'
                 onChangeText={text=> setPhone(text)} />
            <Button icon="camera" mode='contained' onPress={() => openCamera() }>
                     Upload Image
                 </Button>
            <Button disabled={image? false : true} mode='contained' onPress={() => postData()}>
                     Post
                 </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flex:1,
       marginHorizontal: 30,
       justifyContent:'space-evenly'
    },
    text: {
        fontSize: 22,
        textAlign:'center'
    }
})

export default CreateAdScreen;
