import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Axios from 'axios'
import SanberUri from '../../api/SanberUri';
import Colors from '../../styles/Colors';
import styles from './styles'

const ProfileEdit = ({ navigation, route }) => {

  let input = useRef(null)
  let camera =  useRef(null)
  const [editable, setEditable] = useState(false)
  const [token, setToken] = useState('')
  const [name, setName] = useState(route.params.user.name)
  const [email, setEmail] = useState(route.params.user.email)
  const [isVisible, setIsVisible] = useState(false)
  const [type, setType] = useState('back')
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    getToken()
  }, [])
  
  const getToken = async() => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        setToken(token)
      }

    } catch (err) {
      console.log(err)
    }
  }

  const toggleCamera = () =>setType(type == 'back' ? 'front' : 'back')

  const takePicture = async() => {
    const options = { quality: 0.5, base64: true }
    if(camera) {
      const data = await camera.current.takePictureAsync(options)
      setPhoto(data)
      setIsVisible(false)
    }
  }

  const onSavePress = () => {
    const formData = new FormData()
    formData.append('name', name)
    if (photo) {
      formData.append('photo', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpg'
      })
    }
    Axios.post(`${SanberUri.api}/profile/update-profile`, formData, {
      timeout: 20000,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then( res => {
      console.log(res)
      navigation.goBack()
    })
    .catch( err => {
      console.log({err})
    })
  }

  const renderCamera = () => {
    return (
      <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)}>
        <View style={{ flex: 1 }}>
          <RNCamera
            style={{ flex: 1,  }}
            type={type}
            ref={camera}
          >
            <View style={styles.camFlipContainer}>
              <TouchableOpacity style={styles.btnFlip} onPress={toggleCamera}>
                <Icon name="rotate-3d-variant" size={15} />
              </TouchableOpacity>
            </View>

            <View style={styles.btnTakeContainer}>
              <TouchableOpacity style={styles.btnTake} onPress={takePicture}>
                <Icon name="camera-outline" size={30} />
              </TouchableOpacity>
            </View>

          </RNCamera>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={photo ? {uri: photo.uri} : { uri: route.params.user.photo}} style={styles.photo} />
        <TouchableOpacity style={styles.rounded} activeOpacity={0.7} onPress={() => setIsVisible(true)}>
          <Icon name="camera-outline" size={15} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailUser}>
        <View>
          <View>
            <Text style={styles.editTitle}>Full Name</Text>
            <View>
              <TextInput
                ref={input}
                value={name}
                editable={editable}
                color={Colors.black}
                underlineColorAndroid={editable ? Colors.lightGrey : null}
                onChangeText={(value) => setName(value)}
              />
              <Icon name={editable ? "pencil-off-outline" : "pencil-outline"} size={20} style={styles.editIcon} onPress={() => setEditable(!editable)} />
            </View>
          </View>

          <View>
            <Text style={styles.editTitle}>Email</Text>
            <View style={styles.editItem}>
              <TextInput
                ref={input}
                value={email}
                editable={false}
                color={Colors.black}
                onChangeText={(value) => setEmail(value)}
              />
            </View>
          </View>

        </View>

        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.7} onPress={onSavePress}>
            <Text style={styles.btnSaveText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderCamera()}
    </View>
  )
}

export default ProfileEdit
