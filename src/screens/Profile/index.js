import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SanberUri from '../../api/SanberUri';


const Profile = ({ navigation }) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      getProfile(token)
    } catch (err) {
      console.log(err)
    }
  }

  const getProfile = (token) => {
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

  const onLogoutPress = async () => {
    try {
      await AsyncStorage.removeItem('token')
      navigation.navigate('Login')

    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#00BCD4" />
      {/* Toolbar */}
      <View >
        <View style={styles.header}>
          <Text style={styles.headerText}>Account</Text>
        </View>

        <View style={styles.profile}>
          <Image source={{uri: user.photo}} style={styles.img} />
          <Text style={styles.profileText}>{user.name}</Text>
        </View>
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BCD4',
  },
  headerText: {
    margin: 20,
    fontSize: 24,
    color: '#fff',
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  img: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
  },
  profileText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    marginVertical: 4,
  },
  subItemSaldo: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subItem: {
    marginBottom: 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 24,
    fontSize: 14,
  },

});
