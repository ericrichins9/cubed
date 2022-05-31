import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text, StatusBar } from 'react-native';
import { styles } from '../styles'
import JoinGame from './JoinGame'
import CreateGame from './CreateGame'
import WaitingScreen from './Waiting';
import GameSettings from './GameSettings';
import GameScreen from '../GameScreen';
import HowToPlay from './HowToPlay/index'
import io from 'socket.io-client';
import { LinearGradient } from 'expo-linear-gradient';
import DemoGrid from './HowToPlay/DemoGrid';

//const socket = io('https://eager-islands-argue-65-130-22-175.loca.lt');
const socket = io('http://localhost:3000')
export default function PreApp(props) {
  const [gameCreated, setGameCreated] = useState(false)
  const [gameJoined, setGameJoined] = useState(false)
  const [gameSettings, setGameSettings] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [howToPlay, setHowToPlay] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [room, setRoom] = useState({})
  const [roomId, setRoomId] = useState()
  const [isPlayer1, setIsPlayer1] = useState(false)
  const [me, setMe] = useState({}) 
  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])
  const [hasTimer, setHasTimer] = useState(false);
  const [isBombed, setIsBombed] = useState(false);
  const [isEgged, setIsEgged] = useState(false);
  const [centerDisabled, setCenterDisabled] = useState(false);
  const [time, setTime] = useState(14);
  const player1 = '#56ff00'
  const player2 = '#ff8c2c'
  const player3 = '#00f9ff'
  const player4 = '#ff00db'
  const [grid, setGrid] = useState([
    [
        [
            {id: 0, big: false, color: ''},
            {id: 1, med: false, color: ''},
            {id: 2, small: false, color: ''},
        ], // cell 1
        [
            {id: 3, big: false, color: ''},
            {id: 4, med: false, color: ''},
            {id: 5, small: false, color: ''},
        ], // cell 2
        [
            {id: 6, big: false, color: ''},
            {id: 7, med: false, color: ''},
            {id: 8, small: false, color: ''},
        ], // cell 3
    ], // row 1 
    [
        [
            {id: 9, big: false, color: ''},
            {id: 10, med: false, color: ''},
            {id: 11, small: false, color: ''},
        ], // cell 4
        [
            {id: 12, big: false, color: ''},
            {id: 13, med: false, color: ''},
            {id: 14, small: false, color: ''},
        ], // cell 5
        [
            {id: 15, big: false, color: ''},
            {id: 16, med: false, color: ''},
            {id: 17, small: false, color: ''},
        ], // cell 6
    ], // row 2
    [
        [
            {id: 18, big: false, color: ''},
            {id: 19, med: false, color: ''},
            {id: 20, small: false, color: ''},
        ], // cell 7
        [
            {id: 21, big: false, color: ''},
            {id: 22, med: false, color: ''},
            {id: 23, small: false, color: ''},
        ], // cell 8
        [
            {id: 24, big: false, color: ''},
            {id: 25, med: false, color: ''},
            {id: 26, small: false, color: ''},
        ], // cell 9
    ], // row 3
  ])

  const pieces =  [
    [
        {size: 'big', disabled: false},
        {size: 'med', disabled: false},
        {size: 'small', disabled: false}
    ], //big
    [
        {size: 'big', disabled: false},
        {size: 'med', disabled: false},
        {size: 'small', disabled: false}
    ], //med
    [
        {size: 'big', disabled: false},
        {size: 'med', disabled: false},
        {size: 'small', disabled: false}
    ], //small
]

useEffect(() => {
    socket.on('updateRoom', (serverRoom) => {setRoom(serverRoom)})

    socket.on('updateMe', (player) => {setMe(player)})

    socket.on('gameStart', (room) => {
      setWaiting(false)
      setGameStart(true)
    })
    socket.on('newGrid', (grid, room) => {
      const data = JSON.parse(grid)
      const newGrid = data.newGrid

      if (newGrid[1][1][1].disabled && room.players.length === room.turnNumber && room.players.length > 1){
        newGrid[1][1][1].med = false
        newGrid[1][1][1].disabled = false
        newGrid[1][1][1].color = ''
        }
      setGrid(newGrid);
    })
    socket.on('newTurn', (turn, room, player) => {
      const newRoom = {...room}
      newRoom.players[newRoom.turnOrder - 1] = player
      newRoom.turnOrder = turn
      newRoom.turnNumber ++
      setRoom(newRoom)
    })
    socket.on('error', () => {
      alert("Wrong room code")
      setGameJoined(true)
      setWaiting(false)
    })
    socket.on('fullRoom', () => {
        alert("Sorry, this game is full")
        setGameJoined(true)
        setWaiting(false)
    })
    socket.on('playerLeft', (deadPlayer, room, socket) => {
        alert(deadPlayer.name + " has left the game")
        if(room.players[0].id === socket){setIsPlayer1(true)}
        else setIsPlayer1(false)
        setRoom(room)
      })
  }, [])

  
  return (
    <SafeAreaView style={styles.home}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={['#221CC7', 'transparent']} style={styles.background} />

      {
      gameCreated ? 
      <CreateGame room={room} socket={socket} setGrid={setGrid} pieces={pieces} setIsPlayer1={setIsPlayer1} setMe={setMe} setRoom={setRoom} setWaiting={setWaiting} setGameStart={setGameStart} setRoomId={setRoomId} setGameCreated={setGameCreated} player1={player1} player2={player2} player3={player3} player4={player4}/> :
      gameJoined ? 

      <JoinGame room={room} socket={socket} setGrid={setGrid} pieces={pieces} setRoom={setRoom} setGameStart={setGameStart} setRoomId={setRoomId} setMe={setMe} setGameJoined={setGameJoined} setWaiting={setWaiting} player1={player1} player2={player2} player3={player3} player4={player4}/> :
      waiting ? 

      <WaitingScreen socket={socket} roomId={roomId} room={room} isPlayer1={isPlayer1} gameStart={gameStart} setGameSettings={setGameSettings} setWaiting={setWaiting} player1={player1} player2={player2} player3={player3} player4={player4} /> :
      gameSettings ?

      <GameSettings gameStart={gameStart} socket={socket} room={room} setGrid={setGrid} grid={grid} setGameSettings={setGameSettings} setGameStart={setGameStart} setWaiting={setWaiting} time={time} setTime={setTime} hasTimer={hasTimer} setHasTimer={setHasTimer} isEgged={isEgged} setIsEgged={setIsEgged} isBombed={isBombed} setIsBombed={setIsBombed} centerDisabled={centerDisabled} setCenterDisabled={setCenterDisabled} /> :
      howToPlay ?

      <HowToPlay grid={grid} rows={rows} cols={cols} setRows={setRows} setCols={setCols} setHowToPlay={setHowToPlay} player1={player1} player2={player2} player3={player3} player4={player4}/> :
      gameStart ?
      
      <GameScreen grid={grid} socket={socket} room={room} me={me} rows={rows} cols={cols} setGameSettings={setGameSettings} setWaiting={setWaiting} setRows={setRows} setCols={setCols} player1={player1} player2={player2} player3={player3} player4={player4}/> :
       
      <View>
        <Text style={styles.screenTitle}>Cubed</Text>
        <DemoGrid winningCombo={[9,13,17]} player1={player1} player2={player2} player3={player3} player4={player4} />
        <View style={{justifyContent: 'space-evenly',alignItems: "center",flexDirection: 'row'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {setGameCreated(true); setGameJoined(false); setWaiting(false); setGameStart(false)}}>
                <Text style={styles.buttonText}>Create Game</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {setGameCreated(false); setGameJoined(true); setWaiting(false); setGameStart(false)}}>
                <Text style={styles.buttonText}>Join Game</Text>
            </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center',alignItems: "center"}}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {setHowToPlay(true); setGameCreated(false); setGameJoined(false); setWaiting(false); setGameStart(false)}}>
                <Text style={styles.buttonText}>Tutorial</Text>
            </TouchableOpacity>
        </View>
      </View>
      }
    </SafeAreaView>
  )
}