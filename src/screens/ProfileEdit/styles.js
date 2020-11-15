import { StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

export default StyleSheet.create({
  camFlipContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  btnTakeContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photo: {
    width: 100, 
    height: 100,
    borderRadius: 50
  },
  rounded: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: Colors.grey,
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editTitle: {
    fontSize: 12,
    color: Colors.grey,
    marginBottom: -10,
    marginTop: 10,
  },
  editIcon: {
    position: 'absolute',
    color: Colors.grey,
    right: 10,
    top: 10
  },
  editItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  saveBtn: {
    backgroundColor: Colors.blue,
    alignItems: 'center',
    padding: 15,
    borderRadius: 7,
    elevation: 5
  },
  btnSaveText: {
    fontWeight: 'bold',
    color: Colors.white,
  }
})
