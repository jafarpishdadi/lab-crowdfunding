import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  headline: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10
  },

  btnVerify: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    elevation: 5,
    borderRadius: 5,
  },
  btnTextVerify: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
    textTransform: 'uppercase'
  },
  resendWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkResend: {
    fontWeight: 'bold',
    color: Colors.blue,
  },

  otp: {
    marginHorizontal: 10,
    height: 200,
  },

  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
    color: 'black',
  },
})