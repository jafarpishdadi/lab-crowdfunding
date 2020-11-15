import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Button } from 'react-native'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SanberUri from '../../api/SanberUri';
import Colors from '../../styles/Colors';


const Register = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('Zakky')

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
        return alert(err.response.data && err.response.data.message || 'Internal server error')
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
          underlineColorAndroid="#c6c6c6"
          placeholder="Email"
        />
        <Text>Full name</Text>
        <TextInput
          value={fullname}
          onChangeText={(fullname) => setFullname(fullname)}
          underlineColorAndroid="#c6c6c6"
          placeholder="Full name"
        />

        <Button
          color={Colors.blue}
          title="REGISTER"
          onPress={onRegisterPress}
          />
        
        <Text style={styles.registerText}>
          Already have an account?
          <Text onPress={()=>navigation.navigate('Login')} style={styles.registerLink}> Login</Text>
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
    paddingHorizontal: '5%',
    marginTop: 50
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  registerLink: {
    fontWeight: 'bold',
    color: Colors.blue,

  }
}) 
