import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import Colors from '../../styles/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SanberUri from '../../api/SanberUri'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Topup from '../../components/Topup'
import { getFormattedNumber } from '../../bin/Helper'

const DonationDetail = ({ navigation, route }) => {

  const donationInfo = route.params.donation
  const [isVisible, setIsVisible] = useState(false)

  const donationModal = () => {
    return (

      <Modal 
        visible={isVisible} 
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <Topup navigation={navigation} setModal={setIsVisible} donationInfo={donationInfo} />
      </Modal>
    )
  }

  return (
    <View>

      <Image style={ styles.heroImage } source={{uri: donationInfo.photo ? `${SanberUri.base}${donationInfo.photo}` : 'https://placeimg.com/300/100/people'}} />

      <View style={styles.descWrapper}>
        <Text style={styles.textTitle}>{donationInfo.title}</Text>
        <Text style={styles.textSub}>Required fundraising Rp. {getFormattedNumber(donationInfo.donation)}</Text>
        <Text style={styles.textSubBold}>Description</Text>
        <Text>{donationInfo.description}</Text>

        <TouchableOpacity style={styles.donateBtn} onPress={() => setIsVisible(true)}>
          <Text style={styles.donateBtnText}>DONATE NOW</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userContainer}>
        <Text style={styles.textSubBold}>Fundraising Info</Text>
        <View style={styles.userWrapper}>
          <Text>Fundraiser</Text>
          <View style={styles.userWrapper2}>
            <MaterialCommunityIcons name="account" color={Colors.black} size={46} style={styles.userIcon} />
            <Text style={styles.userName}>{donationInfo.user.name}</Text>
          </View>
        </View>
      </View>

      { donationModal() }
    </View>
  )
}

export default DonationDetail

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 200,
  },
  descWrapper: {
    padding: 15,
    backgroundColor: Colors.white
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  textSubBold: {
    fontWeight: 'bold',
  },
  donateBtn: {
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: Colors.blue,
    alignItems: 'center'
  },
  donateBtnText: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  userContainer: {
    backgroundColor: Colors.white,
    marginTop: 5,
    padding: 15,
  },
  userWrapper: {
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 10,
  },
  userWrapper2: {
    flexDirection: 'row',
    alignItems: 'center'
  },
})
