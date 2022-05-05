import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { styles } from '../styles'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator'

export default function JoinGame(props) {
  const [roomId, setRoomId] = useState()
  const [name, onChangeName] = useState();

  useEffect(() => {
    props.socket.on('updatePlayers', (room) => {
      props.setRoom(room)
      props.setMe(room.players[room.players.length - 1])
    })
    props.socket.on('gameStart', (room) => {
      props.setWaiting(false)
      props.setGameStart(true)
    })
    props.socket.on('newGrid', (json) => {
      const data = JSON.parse(json)
      props.setGrid(data.newGrid);
    })
    props.socket.on('newTurn', (turn, room, player) => {
      const newRoom = {...room}
      newRoom.players[newRoom.turnOrder - 1] = player
      newRoom.turnOrder = turn
      props.setRoom(newRoom)
    })
    props.socket.on('error', () => {
      console.log("ERROR")
      alert("Wrong room code")
      props.setGameJoined(true)
      props.setWaiting(false)
    })
  }, [])
  
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
      <TouchableOpacity style={{marginTop: 30}} onPress={() => props.setGameJoined(false)}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
    
      <View style={[styles.container, {minWidth: '85%'}]}>
        <View>
          <Text style={styles.screenTitle}>Join Game</Text>
        </View>
        <View style={styles.container}>
        <Text style={styles.text}>Please enter your room code:</Text>
          <TextInput
            value={roomId}
            mode={'outlined'}
            placeholder={"Room Code"}
            style={[styles.input, {maxHeight: '25%'}]}
            onChangeText={setRoomId}
            activeOutlineColor='#333229'
            dense
          />
        </View>
        <View style={styles.container}>
        <Text style={styles.text}>Give yourself an awesome game name:</Text>
          <TextInput
            onChangeText={onChangeName}
            placeholder={"[your name]"}
            textAlign={'center'}
            value={name}
            style={[styles.input, {maxHeight: '25%'}]}
            mode={'outlined'}
            dense
            activeOutlineColor='#333229'
          />
        </View>
        <View style={[styles.container, {justifyContent: 'flex-end'}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {joinGame(name, props.pieces, props.player2, props.player3, props.player4)}}>
              <Text style={styles.buttonText}>Join Game!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}