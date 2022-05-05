import React, {useState, useEffect} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { styles } from '../styles'
import FadeInOut from 'react-native-fade-in-out';
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator'
import { AntDesign } from '@expo/vector-icons';

export default function CreateGame(props) {
  const [roomId, setRoomId] = useState();
  const [name, onChangeName] = useState();
  const isMyTurn = true
  const [codeCopied, setCodeCopied] = useState(false)

  function copyToClipboard(){
    Clipboard.setString(roomId)
    setCodeCopied(true)
  }

  useEffect(() => {
    props.socket.on('updatePlayers', (room) => {
      props.setRoom(room)
      props.setMe(room.players[0])
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
      alert("Sorry, something went wrong. Please try again")
      props.setGameCreated(true)
      props.setWaiting(false)
    })
  }, [])

  function createGame(name, pieces, room, color){
    if(name === undefined){name = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      style: 'capital',
      separator: ' '
    })}
    props.socket.emit('createRoom', room, name, isMyTurn, pieces, color);
    props.setRoomId(room)
    props.setIsPlayer1(true)
    props.setWaiting(true)
    props.setGameCreated(false)
  }

function randRoom(){
  var result = '';
  var hexChars = '0123456789abcdef';
  for (var i = 0; i < 6; i += 1) {
      result += hexChars[Math.floor(Math.random() * 6)];
  }
  return result;
}

useEffect(() => {setRoomId(randRoom)}, [])

  return (
    <View>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => props.setGameCreated(false)}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
    
      <View style={styles.container}>
        <View style={styles.container}>
        <Text style={styles.screenTitle}>Create Game</Text>
        </View>
        <View style={styles.container}>
        <Text style={styles.text}>Give this code to friends and have them join:</Text>

        <TextInput
          value={roomId}
          mode={'outlined'}
          disabled
          textAlign={'center'}
          style={styles.input}
          dense
        />

        <TouchableOpacity style={{ padding: 5 }} onPress={copyToClipboard}>
          <Text style={styles.text}>copy</Text>
        </TouchableOpacity>

        <FadeInOut visible={codeCopied} duration={400} scale={true}>
          <Text style={styles.copiedText}> copied to clipboard</Text>
        </FadeInOut>
        </View>
        <View style={styles.container}>
        <Text style={styles.text}>Give yourself an awesome game name:</Text>
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
        <View style={[styles.container, {justifyContent: 'flex-end'}]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createGame(name, props.pieces, roomId, props.player1)}
        >
          <Text style={styles.buttonText}>Let's Play!</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}