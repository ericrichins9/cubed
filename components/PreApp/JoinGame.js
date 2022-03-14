import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { styles } from '../styles'
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function JoinGame(props) {
    const [name, onChangeName] = useState("Useless Text");
    const [color, setColor] = useState()

    function joinGame(name, color, pieces){
        socket.emit('newPlayer',  {name, color, pieces})
    }

  return (
      <SafeAreaView style={styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        />

        <br />
        <br />
        
        <Picker
        selectedValue={color}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
        >
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Red" value="red" />
      </Picker>

      <TouchableOpacity
            style={styles.button}
            onPress={() => joinGame(name, color, props.pieces)}
        >
          <Text style={{fontSize: 20}}>Join Game!</Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}