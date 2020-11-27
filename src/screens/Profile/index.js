import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import SanberUri from '../../api/SanberUri';
import Colors from '../../styles/Colors';


const Profile = ({ navigation, route }) => {

  const [user, setUser] = useState(null)
  const [dataStorage, setDataStorage] = useState(null)

  useEffect(() => {
    const getDataStorage = async () => {
      try {
        let token = await AsyncStorage.getItem('token')
        let signinMethod = await AsyncStorage.getItem('signin-method')
  
        let res = { token, signinMethod }
        setDataStorage(res)
        if (signinMethod === 'GOOGLE') getGoogleUser()
        else if(signinMethod === 'SANBER') getSanberUser(token)
  
        return res
      } catch (err) {
        console.log(err)
      }
    }

    getDataStorage()
  }, [])

  const getSanberUser = async (token) => {

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

  const onEditProfilePress = () => {
    navigation.navigate('ProfileEdit', {
      user
    })
  }

  const onHelpPress = () => {
    navigation.navigate('Help')
  }


  const onLogoutPress = async () => {
    if (user) {
      try {
        if (dataStorage.signinMethod === 'GOOGLE') {
          await GoogleSignin.revokeAccess()
          await GoogleSignin.signOut()
  
        } else if(dataStorage.signinMethod === 'SANBER') {
          await AsyncStorage.removeItem('token')
        }  
      } catch (err) {
        console.log(err)
      }
    }
    await AsyncStorage.removeItem('signin-method')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
  }


  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blue} />
      {/* Toolbar */}
      <View >
        <View style={styles.header}>
          <Text style={styles.headerText}>Account</Text>
        </View>

        { user
          ?
          <TouchableOpacity style={styles.profile} onPress={onEditProfilePress} disabled={dataStorage.signinMethod !== 'SANBER'}>
            <Image source={{uri: user && user.photo}} style={styles.img} />
            <Text style={styles.profileText}>{user && user.name} {'\n'}
              <Text style={styles.profileTextSub}>{user && user.email}</Text>
            </Text>
          </TouchableOpacity>
          :
          <View style={styles.profile}>
            <Image source={require('../../assets/images/profile-placeholder.png')} style={styles.img} />
              <Text style={styles.profileText}>No Profile Data</Text>
          </View>
        }
      </View>

      {/* Balance */}
      <View style={styles.menu}>
        <TouchableOpacity>
          <View style={styles.subItemSaldo}>
            <Icon name="wallet" size={18} color={Colors.black} />
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
            <Icon name="settings" size={18} color={Colors.black} />
            <Text style={styles.menuText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHelpPress}>
          <View style={styles.subItem}>
            <Icon name="question" size={18} color={Colors.black} />
            <Text style={styles.menuText}>Help Center</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.subItem}>
            <Icon name="doc" size={18} color={Colors.black} />
            <Text style={styles.menuText}>Term & Condition</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity onPress={onLogoutPress}>
          <View style={styles.subItem}>
            <Icon name="logout" size={18} color={Colors.black} />
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
    backgroundColor: Colors.blue,
  },
  headerText: {
    margin: 20,
    fontSize: 24,
    color: Colors.white,
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.white,
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
  profileTextSub: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  menu: {
    marginVertical: 4,
  },
  subItemSaldo: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subItem: {
    marginBottom: 4,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 24,
    fontSize: 14,
  },

});
