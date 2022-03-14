import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { styles } from '../styles'
import Grid from './Grid';
import ActivePlayer from '../players/ActivePlayer'
import PassivePlayer from '../players/PassivePlayer';
import ConfettiCannon from 'react-native-confetti-cannon';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function GameScreen(props) {
  const [hasWon, setHasWon] = useState(false)
  const [players, setPlayers] = useState([])
  const [grid, setGrid] = useState([
    [
        [
            {id: 0, big: false, color: '', isActive: false},
            {id: 1, med: false, color: '', isActive: false},
            {id: 2, small: false, color: '', isActive: false},
        ], // cell 1
        [
            {id: 3, big: false, color: '', isActive: false},
            {id: 4, med: false, color: '', isActive: false},
            {id: 5, small: false, color: '', isActive: false},
        ], // cell 2
        [
            {id: 6, big: false, color: '', isActive: false},
            {id: 7, med: false, color: '', isActive: false},
            {id: 8, small: false, color: '', isActive: false},
        ], // cell 3
    ], // row 1 
    [
        [
            {id: 9, big: false, color: '', isActive: false},
            {id: 10, med: false, color: '', isActive: false},
            {id: 11, small: false, color: '', isActive: false},
        ], // cell 4
        [
            {id: 12, big: false, color: '', isActive: false},
            {id: 13, med: false, color: '', isActive: false},
            {id: 14, small: false, color: '', isActive: false},
        ], // cell 5
        [
            {id: 15, big: false, color: '', isActive: false},
            {id: 16, med: false, color: '', isActive: false},
            {id: 17, small: false, color: '', isActive: false},
        ], // cell 6
    ], // row 2
    [
        [
            {id: 18, big: false, color: '', isActive: false},
            {id: 29, med: false, color: '', isActive: false},
            {id: 20, small: false, color: '', isActive: false},
        ], // cell 7
        [
            {id: 21, big: false, color: '', isActive: false},
            {id: 22, med: false, color: '', isActive: false},
            {id: 23, small: false, color: '', isActive: false},
        ], // cell 8
        [
            {id: 24, big: false, color: '', isActive: false},
            {id: 25, med: false, color: '', isActive: false},
            {id: 26, small: false, color: '', isActive: false},
        ], // cell 9
    ], // row 3
  ])

  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])
  const [currentTurn, setCurrentTurn] = useState(1)
  const [me, setMe] = useState()
  const bigCircle = 85, medCircle = 60, smallCircle = 25
  const [currentPlayer, setCurrentPlayer] = useState()

  useEffect(() => {
    socket.emit('newPlayer', {id: '', name: 'Eric', isMyTurn: false, color: 'blue', turnOrder: 1, pieces: [
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
    ] }) 
  }, [])


  useEffect(() => {
    socket.on('newGrid', (json) => {
        const data = JSON.parse(json)
        setGrid(data.newGrid);
      })
    socket.on('newTurn', (turn, socket, currentPlayer) => {
        //console.log("TURN", turn, socket)
        setCurrentTurn(turn);
        setCurrentPlayer(currentPlayer)
      })
    socket.on('updatePlayers', (serverPlayers, socket, currentPlayer) => {
        //console.log("SERVER PLAYERS", serverPlayers)
        const me = serverPlayers.find(player => player.id === socket)
        setMe(me)
        setPlayers(serverPlayers)
        setCurrentPlayer(currentPlayer)
        console.log("RENDERED")
    })
    socket.on('notifyPlayers', (player) => {
        alert(player.name + ' has connected')
    })
  }, [])

  return (
      <SafeAreaView style={styles.container}>
          <Grid grid={grid} hasWon={hasWon} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} rows={rows} setRows={setRows} cols={cols} setCols={setCols} />

          {/* {hasWon ? <ConfettiCannon count={500} origin={{x: -10, y: 0}} fadeOut fallSpeed={3500} /> : null}
          {hasWon ? 
              <View style={{marginTop: 60}}>
                  <Text style={{fontSize: 20}}>Congratulations! Way to Win!</Text>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={console.log("DONE")}
                  >
                   <Text style={{fontSize: 20}}>Play Again</Text>
                  </TouchableOpacity>
              </View> 

          :  */}

           {currentPlayer !== undefined && me !== undefined ?
            currentPlayer.id === me.id ?
            <ActivePlayer setHasWon={setHasWon} rows={rows} setRows={setRows} setCols={setCols} cols={cols} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} grid={grid} setGrid={setGrid} players={players} setPlayers={setPlayers} player={currentPlayer} setCurrentPlayer={setCurrentPlayer} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} socket={socket} /> 
            : 
            <PassivePlayer player={players.find(player => player.id === me.id)} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} />
            : null}
      </SafeAreaView>
  )
}