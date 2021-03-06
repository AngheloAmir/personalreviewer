import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface propsReceive {
    navigation :any;
    title      :string
}

export default function Topbar(props :propsReceive) {
  function handleMenuClick() :void {
    props.navigation.openDrawer();
  }

  return (
    <View style={styles.topbar}>
        <TouchableOpacity  onPress={handleMenuClick}>
            <MaterialIcons name='menu' size={48} color='white' />
        </TouchableOpacity>
        <Text style={styles.topbarText}>
            { props.title }
        </Text>
    </View>
  );
}
      
const styles = StyleSheet.create({
  topbar: {
    alignSelf:       'stretch',
    backgroundColor: '#333',
    flexDirection:   'row',
    height:          50,
    paddingLeft:     8,
  },
  topbarText: {
    fontSize:         26,
    color:            'white',
    fontWeight:       "600",
    marginLeft:      24,
    marginTop:       8,
  },
});
