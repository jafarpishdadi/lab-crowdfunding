import Axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SanberUri from '../../api/SanberUri';
import { getToken } from '../../bin/LocalStorage';
import Colors from '../../styles/Colors';
import { TextInputMask } from 'react-native-masked-text'

const DonationCreate = ({ navigation }) => {

  let camera =  useRef(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [total, setTotal] = useState('0')
  const [photo, setPhoto] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [type, setType] = useState('back')

  const toggleCamera = () =>setType(type == 'back' ? 'front' : 'back')

  const takePicture = async() => {
    const options = { quality: 0.5, base64: true }
    if(camera) {
      const data = await camera.current.takePictureAsync(options)
      setPhoto(data)
      setIsVisible(false)
    }
  }

  const onSavePress = async () => {
    const token = await getToken()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('donation', total)
    if (photo) {
      formData.append('photo', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpg'
      })
    }

    Axios.post(`${SanberUri.api}/donasi/tambah-donasi`, formData, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
    .then( res => {
    console.log("onSavePress -> res", res)
      alert('Fundraise has been created')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      })
    })
    .catch( err => {
      console.log("onSavePress -> err", {err})
      alert('Creating Fundraise has failed')
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
      <View style={styles.photoWrapper}>
        <Image source={photo && {uri: photo.uri}} style={styles.photo} />
        <TouchableOpacity style={styles.rounded} activeOpacity={0.7} onPress={() => setIsVisible(true)}>
          <Icon name="camera-outline" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.formWrapper}>
        <Text>Title</Text>
        <TextInput
          value={title}
          onChangeText={(value) => setTitle(value)}
          underlineColorAndroid={Colors.lightGrey}
          placeholder="Title"
        />
        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={(value) => setDescription(value)}
          underlineColorAndroid={Colors.lightGrey}
          placeholder="Description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text>Required fund</Text>
        <TextInputMask
          type={'money'}
          value={total}
          includeRawValueInChangeText={true}
          onChangeText={(masked, raw) => setTotal(raw.toString())}
          options={{
            unit: 'Rp. ',
            delimiter: ' ',
            precision: 0,
          }}
          underlineColorAndroid={Colors.lightGrey}
        />
        
        <TouchableOpacity style={styles.donateBtn} onPress={onSavePress}>
          <Text style={styles.donateBtnText}>CREATE FUNDRAISE</Text>
        </TouchableOpacity>
      </View>
    
      { renderCamera() }
    </View>
  )
}

export default DonationCreate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formWrapper: {
    paddingHorizontal: '5%',
    marginTop: 50,
  },
  donateBtn: {
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    marginTop: 20,
  },
  donateBtnText: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  photoWrapper: {
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    height: '35%',
  },
  photo: {
    width: '100%', 
    height: '100%',
  },
  rounded: {
    position: 'absolute',
    top: '40%',
    backgroundColor: Colors.grey,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  camFlipContainer: {
    backgroundColor: Colors.white,
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
    left: '43%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
})
