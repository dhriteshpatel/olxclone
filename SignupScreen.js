import React,{useState} from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignup = async () =>{
        if(!email || !password){
            Alert.alert('please fill the all fields')
            return
        } 
        try{
            auth().createUserWithEmailAndPassword(email,password)
        } catch(err){
           Alert.alert('something went wrong, try different password')
        }
  
    }
    return (
        <KeyboardAvoidingView behavior='position'>
            <View style={styles.box1}>
                <Image style={{height:200, width:200}} source={require('../../assets/olxlogo.jpg')} />
                <Text style={styles.text}>Signup to continue</Text>
            </View>
            <View style={styles.box2}>
                 <TextInput
                 label="Email"
                 value={email}
                 mode='outlined'
                 onChangeText={text=> setEmail(text)} />

                <TextInput
                 label="Password"
                 value={password}
                 mode='outlined'
                 secureTextEntry={true}
                 onChangeText={text=> setPassword(text)} />

                 <Button mode='contained' onPress={() => userSignup()}>
                     Signup
                 </Button>
                 <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Text style={{textAlign:'center'}}> login?</Text>
                </TouchableOpacity> 
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    box1: {
      alignItems:'center',
      justifyContent: 'space-evenly',
      marginVertical: 20
    },
    box2:{
        paddingHorizontal: 40,
        height:'50%',
        justifyContent:'space-evenly'
    },
    text: {
        fontSize: 22,
        marginVertical: 20
    }
  })

export default SignupScreen;
