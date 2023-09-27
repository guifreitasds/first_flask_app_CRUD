import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Card , FAB} from 'react-native-paper';
import { Stack } from '../../App';

export default function FlatHome(props) {
    const [loading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const loadData = ()=>{
      fetch('http://192.168.1.106:5000/get',{
          method: 'GET'
      })
      .then(resp=>resp.json())
      .then(article => {
          setData(article)
          setIsLoading(false)
      })
      .catch(e=>console.log(e))
  }

    useEffect(()=>{
        fetch('http://192.168.1.106:5000/get',{
            method: 'GET'
        })
        .then(resp=>resp.json())
        .then(article => {
            setData(article)
        })
    }, [])

    const clickedItem = (data) => {
        props.nav.navigation.navigate("Details", {data: data})
    }

    const renderData = (item) => {
        return(
            <Card style={styles.card}>
                <Text style={styles.title} onPress={()=> clickedItem(item)}>{item.title}</Text>
                <Text>{item.text}</Text>
            </Card>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
            data={data}
            renderItem={({item})=> {
                return renderData(item)
            }}
            keyExtractor={item => `${item.id}`}
            onRefresh = {()=>loadData()}
            refreshing = {loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card:{
    backgroundColor: "#ffaabb",
    padding: 10,
    margin: 10,

  },
  title:{
    fontSize: 24
  },

});
