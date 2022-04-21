import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { styles } from '../styles'
import FadeInOut from 'react-native-fade-in-out';

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
      //console.log("NEW TURN", player)
      const newRoom = {...room}
      newRoom.players[newRoom.turnOrder - 1] = player
      newRoom.turnOrder = turn
      props.setRoom(newRoom)
    })
  }, [])

  function createGame(name, pieces, room){
    let color = 'blue'
    props.socket.emit('createRoom', room);
    props.setRoomId(room)
    props.setIsPlayer1(true)
    props.socket.emit('updateRoom', room, name, color, isMyTurn, pieces)
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FadeInOut visible={codeCopied} duration={500} scale={true}>
        <Text> Copied to Clipboard! </Text>
      </FadeInOut>
      <Text style={{ marginBottom: 20 }}>Create Game</Text>

      <Text>Give this code to your friends and have them join:</Text>
      <TextInput editable={false} style={styles.input} value={roomId} />

      <TouchableOpacity
            style={styles.button}
            onPress={copyToClipboard}
      >
        <Text style={{fontSize: 20}}>Copy Code</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        placeholder={"Name"}
        value={name}
      />
      
      <TouchableOpacity
            style={styles.button}
            onPress={() => createGame(name, props.pieces, roomId)}
      >
        <Text style={{fontSize: 20}}>Create Game!</Text>
      </TouchableOpacity>
    </View>
  );
}