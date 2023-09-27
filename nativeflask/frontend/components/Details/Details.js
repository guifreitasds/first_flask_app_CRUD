import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';


export default function Details(props) {
  const data = props.route.params.data

  const deleteData = (data) => {
    fetch(`http://192.168.1.106:5000/delete/${data.id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': "application/json"
            }
        })
        .then(data => {
            props.navigation.navigate('Home')
        })
        .catch(e=>console.log(e))
  }
  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{data.title}</Text>
            <Text style={{fontSize: 16, textAlign: 'center'}}>{data.text}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>{data.date}</Text>

            <View style={styles.containerBtn}>
              <Button
              style={styles.btnStyle}
              icon={"update"}
              mode='contained'
              onPress={()=>props.navigation.navigate("Edit", {data: data})}
              >Edit
              </Button>

              <Button
              style={styles.btnStyle}
              icon={"delete"}
              mode='contained'
              onPress={()=>deleteData(data)}
              >Delete
              </Button>
            </View>
        </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    padding:10,
    margin: 10,
    gap: 10,
  },
  containerBtn: {
    display: "flex",
    alignItems: 'center',
    justifyContent: "center",
    padding:10,
    margin: 10,
    gap: 10,
    flexDirection: 'row'
  },
  btnStyle: {
    borderRadius: 5,
  }
});
