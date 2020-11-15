import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

const EasyGoogleButton = ({ navigation }) => {

  useEffect(() => {
    return async () => {
      console.log('break')
    }
  }, [])

  const onGoogleSigninPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn()

      // Register firebase
      const credential = auth.GoogleAuthProvider.credential(idToken)
      auth().signInWithCredential(credential)
 
      navigation.navigate('Profile', {
        signinMethod: 'GOOGLE'
      })

    } catch (err) {
      console.log({err})
    }
  }

  return (
    <GoogleSigninButton
      onPress={() => onGoogleSigninPress()}
      style={styles.googleBtn}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
    />
  )
}

export default EasyGoogleButton

export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    webClientId: '546285868427-jgknrci50bkd7cr25tjoio4ur2gs4iss.apps.googleusercontent.com',
    offlineAccess: false,
  })
}

const styles = StyleSheet.create({
  googleBtn: {
    width: '103%', 
    marginHorizontal: -5,
    height: 45, 
    marginTop: 20
  }
})
