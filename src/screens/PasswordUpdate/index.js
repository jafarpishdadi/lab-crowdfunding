import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Colors from '../../styles/Colors';
import Axios from 'axios';
import SanberUri from '../../api/SanberUri';
import Icon from 'react-native-vector-icons/Ionicons'

const PasswordUpdate = ({ navigation, route }) => {

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true)

  const userInfo = route.params && route.params.user

  const onSavePress = () => {
    if (password !== passwordConfirm) return alert('Password Confirmation is mismatch.')

    let data = { 
      email: userInfo.email,
      password,
      password_confirmation: passwordConfirm
     }
    Axios.post(`${SanberUri.api}/auth/update-password`, data, {
      timeout: 20000
    })
    .then((res) => {
      console.log(res, route.params)
      navigation.popToTop()
      navigation.replace('Login')
    })
    .catch(err => {
        console.log({err}, route.params)
        return alert(err.response.data && err.response.data.message || 'Internal server error')
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Set new password to secure your account </Text>

      <View style={styles.formWrapper}>
        <View>
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            underlineColorAndroid={Colors.lightGrey}
            placeholder="Password"
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity style={styles.fieldIcon} onPress={() => setHidePassword(!hidePassword)}>
            <Icon name={hidePassword ? "eye-outline" : "eye-off-outline"} size={20} />
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            value={passwordConfirm}
            onChangeText={(value) => setPasswordConfirm(value)}
            underlineColorAndroid={Colors.lightGrey}
            placeholder="Re-type Password"
            secureTextEntry={hidePasswordConfirm}
          />
          <TouchableOpacity style={styles.fieldIcon} onPress={() => setHidePasswordConfirm(!hidePasswordConfirm)}>
            <Icon name={hidePasswordConfirm ? "eye-outline" : "eye-off-outline"} size={20} />
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity style={styles.btnVerify} onPress={onSavePress} >
        <Text style={styles.btnTextVerify}> Save </Text>
      </TouchableOpacity>

    </View>
  )
}

export default PasswordUpdate

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  fieldIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  btnVerify: {
    marginTop: 50,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    elevation: 5,
    borderRadius: 5,
  },
  btnTextVerify: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
    textTransform: 'uppercase'
  },
})
