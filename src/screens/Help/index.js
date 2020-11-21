import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Colors from '../../styles/Colors'
import FeatherIcons from 'react-native-vector-icons/Feather'

MapboxGL.setAccessToken('pk.eyJ1Ijoia29kb2sta2MiLCJhIjoiY2tobGl3NDJ0MTkxejJxcHQ1N3FvMHVobyJ9.IseOh4ElZshR8yHD31M-Uw')

const coordinates = [
  [107.580110, -6.890066],
  [106.819449, -6.218465],
  [110.365231, -7.795766]
]

const Help = () => {

  useEffect(() => {
    const getLocation = async() => {
      try {
        const permission = await MapboxGL.requestAndroidLocationPermissions()
      } catch (err) {
        console.log("Help -> err", {err})
      }
    }

    getLocation()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
      >
        <MapboxGL.UserLocation
          visible={true}
        />
        <MapboxGL.Camera
          centerCoordinate={coordinates[0]}
          zoomLevel={5}
        />
        
        {coordinates.map((coor, index) => (
          <MapboxGL.PointAnnotation
            id={"pointAnnotation"+ index}
            coordinate={coor}
            key={index}
          >
            <MapboxGL.Callout
              title={`Longitude ${coor[0]} \n Latitude ${coor[1]}`}
            />
          </MapboxGL.PointAnnotation>

        ))}

      </MapboxGL.MapView>

      <View style={{ flex: 1 }}>
        <View style={styles.contactWrapper}>
          <FeatherIcons name="home" size={25} />
          <Text style={styles.contactText}>Jakarta, Bandung, Yogyakarta</Text>
        </View>
        <View style={styles.contactWrapper}>
          <FeatherIcons name="mail" size={25} />
          <Text style={styles.contactText}>customer_service@crowdfunding.com</Text>
        </View>
        <View style={styles.contactWrapper}>
          <FeatherIcons name="phone" size={25} />
          <Text style={styles.contactText}>(021) 777 - 8888</Text>
        </View>

        <View style={{ flex: 1, backgroundColor: Colors.white }} />
      </View>

    </View>
  )
}

export default Help

const styles = StyleSheet.create({
  contactWrapper: { 
    flexDirection: 'row', 
    backgroundColor: Colors.white, 
    padding: 20, 
    marginBottom: 3,
    alignItems: 'center'
  },
  contactText: {
    marginLeft: 10
  }
})
