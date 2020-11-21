import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import SanberUri from '../../api/SanberUri'
import { getToken } from '../../bin/LocalStorage'
import Colors from '../../styles/Colors';

const DonationHistory = () => {

  const [history, setHistory] = useState([])

  useEffect(() => {
    const getDataStorage = async () => {
      let token = await getToken()
      getHistory(token)
    }

    getDataStorage()
  }, [])

  const getHistory = async (token) => {
    Axios.get(`${SanberUri.api}/donasi/riwayat-transaksi`, {
      headers: {
        'Authorization': 'Bearer '+ token,
        'Accept': 'application/json',
      }
    })
    .then( res => {
      console.log("DonationHistory -> res", res)
      setHistory(res.data.data.riwayat_transaksi)
    })
    .catch (err => {
      console.log("DonationHistory -> err", err)
    })
  }

  const historyItem = ({ item }) => {

    return (
      <View style={styles.historyItem}>
        <Text style={styles.historyTotal}>Total Rp. {item.amount.toLocaleString()}</Text>
        <Text>Donation Code : {item.order_id}</Text>
        <Text>Date : {item.created_at}</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={history}
        renderItem={historyItem}
        keyExtractor={(i, id) => id.toString()}
      
      />
    </View>
  )
}

export default DonationHistory

const styles = StyleSheet.create({
  historyItem: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 10,
    marginTop: 5,
  },
  historyTotal: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  
})
