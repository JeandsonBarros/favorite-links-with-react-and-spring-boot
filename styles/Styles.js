import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10
  },
  listStyle: {
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textItemList: {
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconButton: {
    backgroundColor: '#3694FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 55,
    height: 55,
    borderRadius: 50,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewRowButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap'
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20,
}
  

});