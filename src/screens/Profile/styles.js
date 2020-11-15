import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  header: {
    backgroundColor: '#00BCD4',
  },
  headerText: {
    margin: 20,
    fontSize: 24,
    color: Colors.white,
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.white,
  },
  img: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
  },
  profileText: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileTextSub: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  menu: {
    marginVertical: 4,
  },
  subItemSaldo: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subItem: {
    marginBottom: 4,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 24,
    fontSize: 14,
  },

});