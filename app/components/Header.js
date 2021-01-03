import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = (props) => {
  return (
    <View style={styles.headerStyle}>
      <Icon name="ios-close" size={35} color="#a8a9ad" />
      <Text style={{ fontSize: 18 }}>Shopping Cart</Text>
      <View style={styles.buttonContainerStyle}>
        <View style={styles.closeButtonStyle}>
          <Text  style={{ fontSize: 16,  color: '#fff' }} onPress={()=>props.empty()}>Empty</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  headerStyle: {
    flex: 0.4,
    elevation: 2,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButtonStyle: {
    backgroundColor: '#de0909',
    padding: 6,
    borderRadius: 4,
  },
};

export default Header;
