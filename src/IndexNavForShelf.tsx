/*
  The index component when the current screen is set to home.
  It set up the React Navigation screen drawer
*/

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ShelfScreenIndex     from './ShelfScreen/Index';
import GlobalStyle          from './Utility/GlobalStyles';

export default function Index() {
  const Drawer = createDrawerNavigator();
  
  async function handleImportShelf() {
    const downloadir = StorageAccessFramework.getUriForDirectoryInRoot('Download');
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    
    if (permissions.granted) {
      const files = await StorageAccessFramework.readDirectoryAsync(downloadir);
      console.log(`=========\nFiles inside ${downloadir}:\n\n${JSON.stringify(files)}`);
      const text = await StorageAccessFramework.readAsStringAsync('content://com.android.externalstorage.documents/tree/primary%3ADownload/document/primary%3ADownload%2Ftest.txt');
      console.log('FILE CONTENT: ' + text);


      console.log('aaaaa: ' + StorageAccessFramework.getUriForDirectoryInRoot('Download'));
    }
  }


  return (
    <NavigationContainer theme={
      //@ts-ignore
      { colors: { background: GlobalStyle.defaultBackgroundColor }}
      }>
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => (
          <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={styles.brandText}>Main Menu</Text>
              </View>
            
            <View style={styles.drawerContainer}>
              <TouchableOpacity
                style={props.state.index == 1 ? styles.drawerItemActive : styles.drawerItem }
                onPress={handleImportShelf}>
                <MaterialCommunityIcons name='database-import' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>Import</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={props.state.index == 3 ? styles.drawerItemActive : styles.drawerItem }
                /*onPress={() => props.state.index != 0 && props.navigation.navigate('....')}*/>
                <MaterialCommunityIcons name='help-box' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={props.state.index == 3 ? styles.drawerItemActive : styles.drawerItem }
                /*onPress={() => props.state.index != 0 && props.navigation.navigate('....')}*/>
                <MaterialCommunityIcons name='information-outline' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>About</Text>
              </TouchableOpacity>
            </View>
            
          </View>
      )}>
        <Drawer.Screen name="Shelfs" component={ShelfScreenIndex} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

//STYLES======================================================================
import { WindowDimension} from './Utility/useResponsive';
const styles = StyleSheet.create({
  container: {
    flexDirection:    'column',
    height:            WindowDimension.height,
    backgroundColor:  '#222',
  }, 
  headingContainer: {
    height:         80,
    backgroundColor: '#333',
    marginBottom:   24,
  },
  brandText :{
    color:         'white',
    fontSize:       21,
    marginTop:      24,
    marginLeft:     8,
  },

  drawerContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  drawerItemActive: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  drawerText: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 16,
  }
});
