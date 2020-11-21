import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native'
import Colors from '../../styles/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import SanberUri from '../../api/SanberUri';
import { FlatList } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box' 
import styles from './styles';

const images = [         
  "https://placeimg.com/300/200/people",                 
  "https://placeimg.com/300/200/nature",                 
  "https://placeimg.com/300/200/arch",                 
]

const Home = ({ navigation, route }) => {
  const [searchInput, setSearchInput] = useState('')

  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getDataStorage = async () => {
      try {
        let signinMethod = await AsyncStorage.getItem('signin-method')

        if (!signinMethod) {
          return navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
          })
        }

        let token = await AsyncStorage.getItem('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY3Jvd2RmdW5kaW5nLnNhbmJlcmRldi5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MDU4Nzg5NjksImV4cCI6MTYwOTQ3ODk2OSwibmJmIjoxNjA1ODc4OTY5LCJqdGkiOiJqcEZJOENMZVhmZnFMbkRUIiwic3ViIjoxNDYsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.0fbf7OwPt5y1TjeFbPb7jpjChoTPBFhTUVffZg7RcYk'
        getDonations(token)
        setIsLoading(false)

      } catch (err) {
        console.log("Home -> err", err)
      }
    }

    getDataStorage()
  }, [])

  const getDonations = async (token) => {

    Axios.get(`${SanberUri.api}/donasi/daftar-donasi`, {
      timeout: 20000,
      headers: {
        'Authorization': 'Bearer '+ token,
      }
    })
    .then( res => {
      setDonations(res.data.data.donasi.reverse())
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
      <TouchableOpacity style={styles.fundraisingItem} onPress={() => onDonateItemPress(item)}>
        <Image source={{uri: itemImage}} style={styles.fundraisingItemImage} />
        <Text style={styles.fundraisingItemText}>{item.title}</Text>
       </TouchableOpacity>
    )
  }

  if (isLoading) return null
  return (
    <>
      <StatusBar backgroundColor={Colors.blue} barStyle="light-content" />
      <View style={styles.toolbarContainer}>
        <View style={styles.toolbarTop}>
          <MaterialCommunityIcons name="hand-heart" color={Colors.white} size={26} />
          <TextInput
            value={searchInput}
            onChangeText={(value) => setSearchInput(value)}
            placeholder="Search here..."
            style={styles.searchField}
            placeholderTextColor={Colors.white}
          />
          <MaterialCommunityIcons name="heart-outline" color={Colors.white} size={26} />
        </View>

        <View style={styles.toolbarBottom}>
          <View>
            <MaterialCommunityIcons name="wallet-outline" color={Colors.black} size={26} />
            <Text>Balance</Text>
          </View>
          <View>
            <MaterialCommunityIcons name="plus-box-outline" color={Colors.black} size={26} />
            <Text>Topup</Text>
          </View>
          <View>
            <MaterialCommunityIcons name="history" color={Colors.black} size={26} />
            <Text>History</Text>
          </View>
          <View>
            <MaterialCommunityIcons name="view-grid-outline" color={Colors.black} size={26} />
            <Text>Other</Text>
          </View>
        </View>
      </View>

      <View style={styles.imageSliderWrapper}>
        <SliderBox 
          images={images} 
          autoplay={true} 
          circleLoop={true} 
          dotColor={Colors.blue}
          style={styles.imageSlider}
        />
      </View>

      <View>
        <View style={styles.headlineMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('Donation')} style={styles.menuWrapper}>
            <MaterialCommunityIcons name="hand-heart" color={Colors.black} size={26} />
            <Text>Donation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Statistic')} style={styles.menuWrapper}>
            <MaterialCommunityIcons name="chart-bar" color={Colors.black} size={26} />
            <Text>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DonationHistory')}  style={styles.menuWrapper}>
            <MaterialCommunityIcons name="script-text-outline" color={Colors.black} size={26} />
            <Text>History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DonationCreate')}  style={styles.menuWrapper}>
            <MaterialCommunityIcons name="heart-plus-outline" color={Colors.black} size={26} />
            <Text>Fundraise</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text>Urgent Fundraising</Text>
        <FlatList 
          data={donations} 
          renderItem={donationItem}
          keyExtractor={(i, index) => index.toString()}
          horizontal={true}
        />        
      </View>

    </>
  )
}

export default Home
