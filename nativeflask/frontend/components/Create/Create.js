import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function Create(props) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    
    const insertData = () => {
        fetch('http://192.168.1.106:5000/add',{
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                title: title,
                text: text
            })
        })
        .then(response => response.json())
        .then(data => {
            props.navigation.navigate('Home')
        })
        .catch(e=>console.log(e))
    }
  return (
    <View style={styles.container}>
        <TextInput style={styles.input}
        label={"Title"}
        value={title}
        mode='outlined'
        onChangeText={text => setTitle(text)}
        />
        <TextInput style={styles.input}
        label={"Text description"}
        value={text}
        mode='outlined'
        multiline
        numberOfLines={10}
        onChangeText={text => setText(text)}
        />
        <Button
            style={styles.buttonInput}
            icon={"pencil"}
            mode='contained'
            onPress={()=>insertData()}
        >Insert article</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  input: {
    padding: 10,
    marginTop: 10,
  },
  buttonInput: {
    marginTop: 10,
    borderRadius: 5,
  }
});
