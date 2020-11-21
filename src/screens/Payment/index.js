import React from 'react'
import {WebView} from 'react-native-webview'

const Payment = ({ route }) => {
  return (
    <WebView
      source={{ uri: route.params.midtrans.redirect_url }}
    />
  )
}

export default Payment
