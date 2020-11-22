import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import Colors from '../../styles/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SanberUri from '../../api/SanberUri';
import { getFormattedNumber } from '../../bin/Helper';


const Donation = ({ navigation }) => {
  navigation.dangerouslyGetParent().setOptions({
    tabBarVisible: false
  });

  const [donations, setDonations] = useState([])
  useEffect(() => {
    getDonations()
  }, [])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      return token
    } catch (err) {
      console.log(err)
    }
  }

  const getDonations = async () => {
    const token = await getToken()

    Axios.get(`${SanberUri.api}/donasi/daftar-donasi`, {
      timeout: 20000,
      headers: {
        'Authorization': 'Bearer '+ token,
      }
    })
    .then( res => {
      setDonations(res.data.data.donasi)
    })
    .catch( err => {
    console.log("Donation -> err", err)
    })
  }

  const onDonateItemPress = (item) => {
    navigation.navigate('DonationDetail', {
      donation: item
    })
  }

  const donationItem = ({ item }) => {
    let itemImage = item.photo ? `${SanberUri.base}${item.photo}` : 'https://placeimg.com/300/100/people'

    return (
      <TouchableOpacity style={styles.donationItem} onPress={() => onDonateItemPress(item)}>
        <Image source={{uri: itemImage }} style={ styles.donationImage } />
        <View style={styles.donationDesc}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textSub}>{item.user.name}</Text>
          <View style={styles.barOut}><View style={styles.barIn}></View></View>
          <Text style={styles.textSub}>Required money</Text>
          <Text style={styles.textTitle}>Rp. {getFormattedNumber(item.donation)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <FlatList 
        data={donations} 
        renderItem={donationItem}
        keyExtractor={(i, index) => index.toString()}
      />

    </>
  )
}

export default Donation

const styles = StyleSheet.create({
  donationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 10,
    marginTop: 5,
  },
  donationImage: {
    width: '45%', 
    height: 100,
    borderRadius: 5,
  },
  donationDesc: {
    width: '50%',
  },
  textTitle: {
    fontWeight: 'bold'
  },
  textSub: {
    fontSize: 12
  },
  barOut: {
    height: 4,
    backgroundColor: 'red',
    marginVertical: 5,
  },
  barIn: {
    height: '100%',
    width: '30%',
    backgroundColor: 'blue',
  }
})
