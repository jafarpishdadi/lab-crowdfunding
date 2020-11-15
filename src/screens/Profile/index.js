import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SanberUri from '../../api/SanberUri';
import Colors from '../../styles/Colors';
import { GoogleSignin } from '@react-native-community/google-signin';
import styles from './styles'


const Profile = ({ navigation, route }) => {

  const [user, setUser] = useState({})
  const signinMethod = route.params.signinMethod

  useEffect(() => {
    if (signinMethod === 'GOOGLE') getGoogleUser()
    else if(signinMethod === 'SANBER') getSanberUser()
  }, [])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      return token
    } catch (err) {
      console.log(err)
    }
  }

  const getSanberUser = async () => {
    const token = await getToken()

    Axios.get(`${SanberUri.api}/profile/get-profile`, {
      timeout: 20000,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then( res => {
      let userApi = res.data.data.profile
      userApi.photo = `${SanberUri.base}${userApi.photo}`
      setUser(userApi)
    })
    .catch( err => {
      console.log('Profile', err)
    })
  }

  const getGoogleUser = async () => {
    const userInfo = await GoogleSignin.signInSilently()
    setUser(userInfo.user)
  }

  const onLogoutPress = async () => {
    if (user) {
      try {
        if (signinMethod === 'GOOGLE') {
          await GoogleSignin.revokeAccess()
          await GoogleSignin.signOut()
  
        } else if(signinMethod === 'SANBER') {
          await AsyncStorage.removeItem('token')
        }  
      } catch (err) {
        console.log(err)
      }
    }
    navigation.replace('Login')
  }

  const onEditProfilePress = () => {
    navigation.navigate('ProfileEdit', {
      user,
      signinMethod
    })
  }

  
  return (
    <>
      <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
      {/* Toolbar */}
      <View >
        { signinMethod === 'SANBER' 
        ?
        <TouchableOpacity style={styles.profile} onPress={onEditProfilePress}>
          <Image source={{uri: user.photo}} style={styles.img} />
          <Text style={styles.profileText}>{user && user.name} {'\n'}
            <Text style={styles.profileTextSub}>{user && user.email}</Text>
          </Text>
        </TouchableOpacity>
        :
        <View style={styles.profile}>
          <Image source={{uri: user.photo || 'http://placeimg.com/100/100/people' }} style={styles.img} />
          <Text style={styles.profileText}>{user && user.name} {'\n'}
            <Text style={styles.profileTextSub}>{user && user.email}</Text>
          </Text>
        </View>

        }
      </View>

      {/* Balance */}
      <View style={styles.menu}>
        <TouchableOpacity>
          <View style={styles.subItemSaldo}>
            <Icon name="wallet" size={18} color="#000" />
            <View style={{marginLeft: -130}}>
              <Text style={styles.menuText}>Balance</Text>
            </View>
            <Text style={styles.menuText}> Rp. 7.000.000</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity>
          <View style={styles.subItem}>
            <Icon name="settings" size={18} color="#000" />
            <Text style={styles.menuText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.subItem}>
            <Icon name="question" size={18} color="#000" />
            <Text style={styles.menuText}>Help Center</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.subItem}>
            <Icon name="doc" size={18} color="#000" />
            <Text style={styles.menuText}>Term & Condition</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity onPress={onLogoutPress}>
          <View style={styles.subItem}>
            <Icon name="logout" size={18} color="#000" />
            <Text style={styles.menuText}>Logout</Text>
          </View>
        </TouchableOpacity>        
      </View>

    </>
  )
}

export default Profile
