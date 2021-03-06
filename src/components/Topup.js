import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import SanberUri from '../api/SanberUri'
import Colors from '../styles/Colors'
import { TextInputMask } from 'react-native-masked-text'
import { getFormattedNumber, getToken } from '../bin/Helper'

const TOPUP_LIST = [
  { id: 'topup10k', total: 10000 },
  { id: 'topup20k', total: 20000 },
  { id: 'topup50k', total: 50000 },
  { id: 'topup100k', total: 100000 },
  { id: 'topup200k', total: 200000 },
  { id: 'topup500k', total: 500000 },
]

const Topup = ({ navigation, donationInfo, setModal }) => {

  const [donation, setDonation] = useState('')
  const [topupSelected, setTopupSelected] = useState(null)

  const onPayPress = async () => {
    const token = await getToken()

    const time = new Date().getTime()
    const nominal = parseInt(donation)
    const body = {
      transaction_details: {
        order_id: `Donasi-${time}`,
        gross_amount: nominal,
        donation_id: donationInfo.id
      },
      customer_details: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.co'
      }
    }

    Axios.post(`${SanberUri.api}/donasi/generate-midtrans`, body, {
      timeout: 20000,
      headers: {
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'application/json,'
      }
    })
    .then(res => {
    console.log("onPayPress -> res", res)
      if(res) {
        setModal(false)
        const data = res.data.data
        navigation.navigate('Payment', data)
      }
    })
    .catch(err => {
    console.log("onPayPress -> err", {err})
      
    })
  }

  const onTopupPress = (index) => {
    setTopupSelected(index)
    setDonation(TOPUP_LIST[index].total.toString())
  }

  const topupItem = ({item, index}) => {
    return (
      <TouchableOpacity 
        style={topupSelected === index ? [styles.donateRpBtn, styles.active] : styles.donateRpBtn }
        onPress={() => onTopupPress(index)}
      >
        <Text>Rp. {getFormattedNumber(item.total)}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalWrapper}>
        <Text>Enter Your Donation</Text>
        <TextInputMask
          type={'money'}
          value={donation}
          includeRawValueInChangeText={true}
          onChangeText={(masked, raw) => {setDonation(raw.toString()); setTopupSelected(null)} }
          options={{
            unit: 'Rp. ',
            delimiter: ' ',
            precision: 0,
          }}
          underlineColorAndroid={Colors.lightGrey}
          placeholder='Rp. 0'
        />
        
        <FlatList
            numColumns={3}                  // set number of columns 
            data={TOPUP_LIST}
            keyExtractor={(item, index) => item.id }
            renderItem={topupItem}
        />
        
        <TouchableOpacity style={styles.donateBtn} onPress={onPayPress}>
          <Text style={styles.donateBtnText}>NEXT</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Topup

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, 
    justifyContent: 'flex-end',
    backgroundColor: Colors.transparent
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    height: '50%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  donateRpBtn: {
    flex: 1, 
    flexDirection: 'column', 
    margin: 5,
    backgroundColor: Colors.white,
    elevation: 4,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  active: {
    backgroundColor: Colors.cyan
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
})
