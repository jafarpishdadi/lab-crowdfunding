import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Colors from '../../styles/Colors';
import Axios from 'axios';
import SanberUri from '../../api/SanberUri';
import styles from './styles';


const OTPVerification = ({ navigation, route }) => {

  const [otpCode, setOtpCode] = useState('')
  const userInfo = route.params && route.params.user

  const onVerifyPress = () => {
    let data = { otp: otpCode }
    Axios.post(`${SanberUri.api}/auth/verification`, data, {
      timeout: 20000
    })
    .then((res) => {
      console.log(res, route.params)
      navigation.navigate('PasswordUpdate', { 
        user: userInfo
      })
    
    })
    .catch(err => {
        console.log({err}, route.params)
        navigation.navigate('PasswordUpdate', { 
          user: userInfo
        })
        return alert(err.response.data && err.response.data.message || 'Internal server error')
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Your way to be better is start from here </Text>
      <Text>Enter 6 digit code which we sent to </Text>
      <Text style={{ fontWeight: 'bold' }}>{userInfo && userInfo.email}</Text>

      <OTPInputView
        style={styles.otp}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled = {(code) => setOtpCode(code)}
        placeholderTextColor={Colors.black}
      />

      <TouchableOpacity style={styles.btnVerify} onPress={onVerifyPress} >
        <Text style={styles.btnTextVerify}> Verify </Text>
      </TouchableOpacity>

      <View style={styles.resendWrapper}>
        <Text style={{ color: Colors.grey }}>Don't got verification code? </Text>
        <TouchableOpacity>
          <Text style={styles.linkResend}> Resend Code </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default OTPVerification
