import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from '../styles'
import Grid from './Grid';
import ActivePlayer from '../players/ActivePlayer'
import InactivePlayer from '../players/InactivePlayer';
import ConfettiCannon from 'react-native-confetti-cannon';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function GameScreen(props) {
  const [hasWon, setHasWon] = useState(false)
  const [players, setPlayers] = useState([])
  const grid = props.grid
  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])
  const [me, setMe] = useState(props.me)
  const bigCircle = 85, medCircle = 60, smallCircle = 25
  const currentPlayer = props.room.players[props.room.turnOrder - 1]

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

           {currentPlayer.id === me.id ?
            <ActivePlayer setHasWon={setHasWon} currentTurn={props.currentTurn} room={props.room} rows={rows} setRows={setRows} setCols={setCols} cols={cols} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} grid={grid} players={players} setPlayers={setPlayers} player={currentPlayer} socket={socket} /> 
            : 
            <InactivePlayer player={me} currentTurn={props.currentTurn} currentPlayer={currentPlayer} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} />
            }
      </SafeAreaView>
  )
}