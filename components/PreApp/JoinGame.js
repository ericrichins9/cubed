import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text, TextInput } from 'react-native';
import { styles } from '../styles'

export default function JoinGame(props) {
  const [roomId, setRoomId] = useState()
  const [name, onChangeName] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)

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
    props.socket.on('newTurn', (turn, room) => {
      props.setRoom({...room, turnOrder: turn })
    })
  }, [])
  
  function joinGame(name, pieces){
    let color = 'green'
    const isMyTurn = false
    if(numberOfPlayers < 4){
      props.socket.emit('join',  roomId)
      props.socket.emit('updateRoom', roomId, name, color, isMyTurn, pieces)
      setNumberOfPlayers(numberOfPlayers + 1)
      props.setGameJoined(false) 
      props.setWaiting(true)
    }
    else alert("Sorry, this game is full")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Join Game</Text>

      <TextInput
        style={styles.input}
        onChangeText={setRoomId}
        value={roomId}
        placeholder={"Room Code"}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder={"Name"}
      />
      
      <TouchableOpacity
            style={styles.button}
            onPress={() => {joinGame(name, props.pieces)}}
        >
          <Text style={{fontSize: 20}}>Join Game!</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => props.setGameJoined(false)}
      >
        <Text style={{fontSize: 20}}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}