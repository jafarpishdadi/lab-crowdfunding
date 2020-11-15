import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, SafeAreaView, StatusBar } from 'react-native'
import Colors from '../../styles/Colors';

const {height, width} = Dimensions.get('window')

const SplashScreen = () => {
  
  const fadeOut = useRef(new Animated.Value(1)).current
  const fadeIn = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false
    }).start()
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false
    }).start()

  }, [fadeOut, fadeIn])

  const transformY = fadeIn.interpolate({
    inputRange: [0, 1],
    outputRange: [height, -height / 2]
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Animated.View style={[styles.quotesContainer, { opacity: fadeOut }]}>
          <Text style={styles.quotes}>"This will be amazing app someday"</Text>
        </Animated.View>
        <Animated.View style={[styles.logo, { opacity: fadeIn, transform: [{translateY: transformY}] }]}>
          <Text style={styles.textLogo}>Crowd Funding</Text>
        </Animated.View>

      </View>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.green
  },
  quotesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quotes: {
    fontSize: 14,
    color: Colors.white,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textLogo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
  }
})
