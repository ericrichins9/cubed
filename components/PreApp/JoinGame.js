import React, {useState, useEffect} from 'react';
import { TouchableOpacity, KeyboardAvoidingView, View, Text } from 'react-native';
import { styles } from '../styles'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator'

export default function JoinGame(props) {
  const [roomId, setRoomId] = useState()
  const [name, onChangeName] = useState();
  
  function joinGame(name, pieces, p2Color, p3Color, p4Color){
    if(name === undefined){name = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      style: 'capital',
      separator: ' '
    })}
    const isMyTurn = false
    props.socket.emit('join',  roomId, name, isMyTurn, pieces, p2Color, p3Color, p4Color)
    props.setGameJoined(false) 
    props.setWaiting(true)
  }

  return (
    <View>
      <TouchableOpacity style={{marginTop: 30, marginLeft: -10}} onPress={() => props.setGameJoined(false)}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
    
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: 'space-around'}}>
        <View>
          <Text style={styles.screenTitle}>Join Game</Text>
        </View>

        <View style={styles.container}>
        <Text style={styles.text}>enter cubed code:</Text>
        <View style={{width: '50%'}}>
          <TextInput
            value={roomId}
            mode={'outlined'}
            placeholder={"Cubed Code"}
            style={styles.input}
            onChangeText={setRoomId}
            activeOutlineColor='#333229'
            dense
          />
          </View>
        </View>
        <View style={styles.container}>
        <Text style={styles.text}>Give yourself an awesome game name:</Text>
          <View style={{width: '50%'}}>
          <TextInput
            onChangeText={onChangeName}
            placeholder={"[your name]"}
            textAlign={'center'}
            value={name}
            style={styles.input}
            mode={'outlined'}
            dense
            activeOutlineColor='#333229'
          />
          </View>
        </View>
        <View style={[styles.container, {justifyContent: 'flex-end'}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {joinGame(name, props.pieces, props.player2, props.player3, props.player4)}}>
              <Text style={styles.buttonText}>Join Game!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}