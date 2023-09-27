import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';  
import Contants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './components/HomePage/HomePage';
import Create from './components/Create/Create';
import Details from './components/Details/Details';
import Edit from './components/Edit/Edit';

export const Stack = createStackNavigator()

function App() {
  
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage}/>
        <Stack.Screen name='Create' component={Create}/>
        <Stack.Screen name='Details' component={Details}/>
        <Stack.Screen name='Edit' component={Edit}/>
      </Stack.Navigator>

    </View>
  );
}

export default() => {
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Contants.statusBarHeight,
  },
});
