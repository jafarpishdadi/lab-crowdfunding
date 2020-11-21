import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Button } from 'react-native'
import Colors from '../../styles/Colors';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import TouchID from 'react-native-touch-id';
import Icon from 'react-native-vector-icons/Ionicons';
import SanberUri from '../../api/SanberUri';


const touchIdConfig = {
  title: 'Authentication required',
  imageColor: Colors.violet,
  imageErrorColor: 'red',
  sensorDescription: 'Touch sensor',
  sensorErrorDescription: 'Failed',
  cancelText: 'Cancel',
}

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('zakkymf@gmail.com')
  const [password, setPassword] = useState('123456')

  useEffect(() => {
    configureGoogleSignin()
  }, [])

  const configureGoogleSignin = () => {
    GoogleSignin.configure({
      webClientId: '546285868427-jgknrci50bkd7cr25tjoio4ur2gs4iss.apps.googleusercontent.com',
      offlineAccess: false,
    })
  }

  const onGoogleSigninPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn()

      // Register firebase
      const credential = auth.GoogleAuthProvider.credential(idToken)
      auth().signInWithCredential(credential)
 
      saveLoginParams('GOOGLE')
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardTab'}]
      })

    } catch (err) {
      console.log(err)
    }
  }

  const saveLoginParams = async (signinMethod, token = null) => {
    try {
      if (token) await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('signin-method', signinMethod)
      await AsyncStorage.setItem('seen-intro', 'true')
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
      saveLoginParams('SANBER', res.data.data.token)
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardTab'}]
      })
    
    })
    .catch(err => {
        console.log({err})
        return alert('Invalid Username / Password')
    })
  }

  const onFingerprintSigninPress = () => {
    TouchID.authenticate('', touchIdConfig)
    .then(success => {
      saveLoginParams('TOUCHID')
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardTab'}]
      })
    })
    .catch(err => {
      if (err.code === "AUTHENTICATION_CANCELED") return

      alert('Authentication failed')
      console.log({err})
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
      <View>
        <View style={styles.textLogoContainer}>
          <Text style={styles.textLogo}>Login Screen</Text>
        </View>
        <View style={styles.formContainer}>
          <Text>Username</Text>
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            underlineColorAndroid={Colors.lightGrey}
            placeholder="Username or Email"
          />
          <Text>Password</Text>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            underlineColorAndroid={Colors.lightGrey}
            placeholder="Password"
            secureTextEntry
          />

          <Button
            color={Colors.blue}
            title="SIGN IN"
            onPress={onLoginPress}
            />
          
          <Text style={styles.registerText}>
            Do not have account yet?
            <Text onPress={()=>navigation.navigate('Register')} style={styles.registerLink}> Register</Text>
          </Text>


        </View>
      </View>
      <View>
        <Text style={styles.instantSigninText}>or sign in instantly using</Text>
        <View style={styles.instantSigninWrapper}>
          <TouchableOpacity onPress={onFingerprintSigninPress} style={styles.fingerBtn}>
            <Icon name="finger-print" size={20} />
            <Text style={styles.fingerBtnText}>Fingerprint</Text>
          </TouchableOpacity>

          <GoogleSigninButton
            onPress={onGoogleSigninPress}
            style={styles.googleBtn}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
          />
        </View>

      </View>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  textLogoContainer: {
    marginTop: '50%',
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

  },
  instantSigninText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  instantSigninWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  fingerBtn: {
    width: 150,
    height: 42,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: Colors.white,
    elevation: 4,
  },
  fingerBtnText: {
    fontWeight: 'bold',
  },
  googleBtn: {
    width: 150, 
    // marginHorizontal: -5,
    height: 50, 
    marginLeft: 20,
  },
}) 
