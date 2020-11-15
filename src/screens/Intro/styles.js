import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.green
  },
  textLogoContainer: {
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center'
  },
  textLogo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.white
  },
  slider: {
      flex: 1
  },
  btnContainer: {
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'flex-end'
  },
  btnLogin: {
      height: 35,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white
  },
  btnTextLogin: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.green
  },
  btnRegister: {
      height: 35,
      width: '90%',
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: Colors.white,
      backgroundColor: 'transparent'
  },
  btnTextRegister: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.white
  },
  listContainer: {
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
  },
  listContent: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center'
  },
  imgList: {
      width: 330,
      height: 330,
      borderRadius: 165
  },
  textList: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.white,
      textAlign: 'center',
      marginTop: 15
  },
  activeDotStyle: {
      width: 20,
      backgroundColor: Colors.white
  }
})
