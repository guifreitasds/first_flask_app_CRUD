import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderHome from '../HeaderHome/HeaderHome';
import FlatHome from '../FlatHome/FlatHome';
import Contants from 'expo-constants';
import { FAB} from 'react-native-paper';

export default function HomePage(props) {

  return (
    <View style={styles.container}>
      <HeaderHome/>
      <FlatHome nav={props}/>
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{colors: {accent: "red"}}}
        onPress={()=>props.navigation.navigate('Create')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});