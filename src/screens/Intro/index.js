import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Colors from '../../styles/Colors';
import { Button } from '../../components/Button';
import styles from './styles';


const data = [
  {
    id: 1,
    image: require('../../assets/images/intro-1.jpeg'),
    description: 'Just imagine, this is crowd funding illustration.\n Which make you so interest',
  },
  {
    id: 2,
    image: require('../../assets/images/intro-2.jpeg'),
    description: 'Just imagine, this is crowd funding illustration.\n Which make you feel like helping'
  },
  {
    id: 3,
    image: require('../../assets/images/intro-3.jpeg'),
    description: 'Just imagine, this is crowd funding illustration.\n Which make you sure to donate',
  },

]

const Intro = ({ navigation }) => {

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <View style={styles.listContent}>
          <Image source={item.image} style={styles.imgList} resizeMethod="auto" resizeMode="contain" />
        </View>
        <Text style={styles.textList}>{item.description}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.green} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.textLogoContainer}>
          <Text style={styles.textLogo}>Crowd Funding</Text>
        </View>
        <View style={styles.slider}>
          <AppIntroSlider 
            data={data}
            renderItem={renderItem}
            renderNextButton={() => null}
            renderDoneButton={() => null}
            activeDotStyle={styles.activeDotStyle}
            keyExtractor={(item) => item.id.toString() }
          />
        </View>

        <View style={styles.btnContainer}>
          <Button style={styles.btnLogin} onPress={() => navigation.navigate('Login')} >
            <Text style={styles.btnTextLogin}>LOGIN</Text>
          </Button>
          <Button style={styles.btnRegister} onPress={() => navigation.navigate('Register')} ><
            Text style={styles.btnTextRegister}>REGISTER</Text>
          </Button>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Intro
