import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native'
import colors from '../../styles/Colors'
import Icon from 'react-native-vector-icons/Feather'
import { RNCamera } from 'react-native-camera';
import MaterialCommunitry from 'react-native-vector-icons/MaterialCommunityIcons'
import Axios from 'axios'
import SanberUri from '../../api/SanberUri'


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

  const toggleCamera = () =>setType(type == 'back' ? 'front' : 'back')

  const takePicture = async() => {
    const options = { quality: 0.5, base64: true }
    if(camera) {
      const data = await camera.current.takePictureAsync(options)
      setPhoto(data)
      setIsVisible(false)
    }
  }

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

  const editData = () => setEditable(!editable)

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
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then( res => {
      navigation.pop(2)
      navigation.replace('Profile')
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
                <MaterialCommunitry name="rotate-3d-variant" size={15} />
              </TouchableOpacity>
            </View>

            {/* <View style={styles.round} />
            <View style={styles.rectangle} /> */}
            <View style={styles.btnTakeContainer}>
              <TouchableOpacity style={styles.btnTake} onPress={takePicture}>
                <Icon name="camera" size={30} />
              </TouchableOpacity>
            </View>

          </RNCamera>
        </View>
      </Modal>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={styles.profileContainer}>
        <Image source={photo ? {uri: photo.uri} : { uri: route.params.user.photo}} style={styles.photo} />
        <TouchableOpacity style={styles.rounded} activeOpacity={0.7} onPress={() => setIsVisible(true)}>
          <Icon name="camera" size={15} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.detailUser}>
        <View style={styles.editContainer}>
          <View>
            <Text style={styles.editTitle}>Full Name</Text>
            <View style={styles.editItem}>
              <TextInput
                ref={input}
                value={name}
                editable={editable}
                style={styles.input}
                onChangeText={(value) => setName(value)}
              />
              <Icon name="edit-2" size={20} color={colors.grey} onPress={editData} />
            </View>
          </View>

          <View>
            <Text style={styles.editTitle}>Email</Text>
            <View style={styles.editItem}>
              <TextInput
                ref={input}
                value={email}
                editable={false}
                style={styles.input}
                onChangeText={(value) => setEmail(value)}
              />
              {/* <Icon name="edit-2" size={20} color={colors.grey} onPress={editData} /> */}
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

const styles = StyleSheet.create({
  camFlipContainer: {
    backgroundColor: colors.white,
    elevation: 5,
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  btnTakeContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photo: {
    width: 100, 
    height: 100,
    borderRadius: 50
  },
  rounded: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: colors.grey,
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editTitle: {
    fontSize: 12,
    color: colors.grey
  },
  editItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  saveBtn: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    padding: 15,
    borderRadius: 7,
    elevation: 5
  },
  btnSaveText: {
    fontWeight: 'bold',
    color: colors.white,
  }
})
