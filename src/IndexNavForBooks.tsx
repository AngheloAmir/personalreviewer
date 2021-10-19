/*
  The index component when the current screen is set to home.
  It set up the React Navigation screen drawer
*/

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { contextProvider, StateAPI, action } from './StateAPI';
import HomeScreenIndex      from './BooksScreen/Index';
import SearchScreen         from './!NavDrawerScreens/SearchScreen';
import HelpScreen           from './!NavDrawerScreens/HelpScreen';
import AboutScreen          from './!NavDrawerScreens/AboutScreen';

import GlobalStyle          from './Utility/GlobalStyles';

export default function Index() {
  const { dispatch } :StateAPI = React.useContext(contextProvider);
  const Drawer = createDrawerNavigator();
  
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
                style={ styles.drawerItem }
                onPress={() => dispatch(action.app.setIsOnBooks(false))}>
                <MaterialCommunityIcons name='bookshelf' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>Your Shelfs</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={props.state.index == 1 ? styles.drawerItemActive : styles.drawerItem }
                onPress={() => props.state.index != 1 && props.navigation.navigate('Search')}>
                <MaterialCommunityIcons name='file-find' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>Search</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={props.state.index == 2 ? styles.drawerItemActive : styles.drawerItem }
                onPress={() => props.state.index != 2 && props.navigation.navigate('Help')}>
                <MaterialCommunityIcons name='help-box' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={props.state.index == 3 ? styles.drawerItemActive : styles.drawerItem }
                onPress={() => props.state.index != 3 && props.navigation.navigate('About')}>
                <MaterialCommunityIcons name='information-outline' size={24} color='lightgreen' />
                <Text style={styles.drawerText}>About</Text>
              </TouchableOpacity>
            </View>
            
          </View>
      )}>
        <Drawer.Screen name="Books" component={HomeScreenIndex} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        
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
