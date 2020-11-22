
import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  toolbarContainer: {
    backgroundColor: Colors.blue,
    height: 120,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    zIndex: 1
  },
  toolbarTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  searchField: {
    width: '70%',
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.white,
    color: Colors.white,
    paddingHorizontal: 10,
  },
  toolbarBottom: {
    backgroundColor: Colors.white,
    width: '95%',
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: -35,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarBottomItem: {
    alignItems: 'center', borderRadius: 5, padding: 5,
  },
  imageSlider: {
    height: 180,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  headlineMenu: {
    backgroundColor: Colors.white,
    width: '95%',
    height: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuWrapper: {
    alignItems: 'center'
  },
  fundraisingItem: {
    backgroundColor: Colors.white,
    width: 200,
    borderRadius: 15,
    margin: 5,
    marginBottom: 10,
    elevation: 5,
  },
  fundraisingItemImage: {
    width: 200, 
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  fundraisingItemText: {
    fontSize: 12,
    margin: 10,
  }
})