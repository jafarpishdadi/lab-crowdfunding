import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Button, Alert } from 'react-native'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SanberUri from '../../api/SanberUri';
import Colors from '../../styles/Colors';
import EasyGoogleButton, { configureGoogleSignin } from '../../components/EasyGoogleButton';


const Register = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('Zakky')

  useEffect(() => {
    configureGoogleSignin()
  }, [])

  const onRegisterPress = () => {
    let data = { email, name: fullname }
    Axios.post(`${SanberUri.api}/auth/register`, data, {
      timeout: 20000
    })
    .then((res) => {
      console.log(res)
      navigation.navigate('OTPVerification', { 
        user: res.data.data.user
      })
    
    })
    .catch(err => {
        console.log({err})
        let errRes = err.response.data
        if (errRes && errRes.errors.email[0] == 'The email has already been taken.') {
          return Alert.alert('Warning', 'Email has registered. Will you verify email instead?', [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { 
                text: "OK", onPress: () => navigation.navigate('OTPVerification', { 
                  user: data
                }) 
              }
            ], 
            { cancelable: true }
          );
        } 
        return alert(errRes && errRes.message || 'Internal server error')
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
      <View style={styles.textLogoContainer}>
        <Text style={styles.textLogo}>Register Screen</Text>
      </View>
      <View style={styles.formContainer}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          underlineColorAndroid={Colors.lightGrey}
          placeholder="Email"
        />
        <Text>Full name</Text>
        <TextInput
          value={fullname}
          onChangeText={(fullname) => setFullname(fullname)}
          underlineColorAndroid={Colors.lightGrey}
          placeholder="Full name"
        />

        <Button
          color={Colors.blue}
          title="REGISTER"
          onPress={onRegisterPress}
          />

        <EasyGoogleButton navigation={navigation} />
        
        <Text style={styles.registerText}>
          Already have an account?
          <Text onPress={()=>navigation.replace('Login')} style={styles.registerLink}> Login</Text>
        </Text>
      </View>
      <View style={styles.termContainer}>
        <Text style={styles.termText}>
          With Register, I have accept Term & Condition CrowdFunding.com 
        </Text>
      </View>

    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  textLogoContainer: {
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.blue
  },
  formContainer: {
    marginTop: 50
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  registerLink: {
    fontWeight: 'bold',
    color: Colors.blue,
  },
  termContainer: {
    marginTop: 150,
  },
  termText: {
    textAlign: 'center',
    color: Colors.grey
  }
}) 
