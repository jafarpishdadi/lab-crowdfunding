import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import database from '@react-native-firebase/database'
import Axios from 'axios'
import { GiftedChat } from 'react-native-gifted-chat'
import SanberUri from '../../api/SanberUri'
import { getToken } from '../../bin/Helper'

const Inbox = () => {

  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log('Start component')
    
    getProfile()
    onRef()

    return () => {
      const db = database().ref('messages')
      if (db) {
        db.off()
      }
    }
  }, [])


  const getProfile = async () => {
    const token = await getToken()

    Axios.get(`${SanberUri.api}/profile/get-profile`, {
      headers: {
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log("Inbox -> res", res)
      let data = res.data.data.profile
      setUser(data)
    })
    .catch((err) => {
      console.log("Inbox -> err", err)
    })
  }

  const onRef = () => {
    database().ref('messages').limitToLast(20).on('child_added', snapshot => {
      const value = snapshot.val()
      setMessages(previousMessages => GiftedChat.append(previousMessages, value))
    })
  }

  const onSend = (messages = []) => {
    for (let i=0; i<messages.length; i++) {
      database().ref('messages').push({
        _id: messages[i]._id,
        createdAt: database.ServerValue.TIMESTAMP,
        text: messages[i].text,
        user: messages[i].user,
      })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(msg) => onSend(msg)}
        user={{
          _id: user.id,
          name: user.name,
          avatar: `${SanberUri.base}${user.photo}`
        }}
        showUserAvatar
      />
    </View>
  )
}

export default Inbox

const styles = StyleSheet.create({})
