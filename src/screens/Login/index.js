import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Button } from 'react-native'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SanberUri from '../../api/SanberUri';
import Colors from '../../styles/Colors';


const Login = ({ navigation }) => {

  const [email, setEmail] = useState('zakkymf@gmail.com')
  const [password, setPassword] = useState('123456')

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token)
    } catch (err) {
      console.log(err)
    }
  }

  const onLoginPress = () => {
    let data = { email, password }
    Axios.post(`${SanberUri.api}/auth/login`, data, {
      timeout: 20000
    })
    .then((res) => {
      console.log(res)
      saveToken(res.data.data.token)
      navigation.navigate('Profile')
    
    })
    .catch(err => {
        console.log({err})
        return alert('Invalid Username / Password')
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
      <View style={styles.textLogoContainer}>
        <Text style={styles.textLogo}>Login Screen</Text>
      </View>
      <View style={styles.formContainer}>
        <Text>Username</Text>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          underlineColorAndroid="#c6c6c6"
          placeholder="Username or Email"
        />
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          underlineColorAndroid="#c6c6c6"
          placeholder="Password"
          secureTextEntry
        />

        <Button
          color={Colors.blue}
          title="LOGIN"
          onPress={onLoginPress}
          />
        
        <Text style={styles.registerText}>
          Do not have account yet?
          <Text onPress={()=>navigation.navigate('Register')} style={styles.registerLink}> Register</Text>
        </Text>
      </View>

    </View>
  )
}

export default Login

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