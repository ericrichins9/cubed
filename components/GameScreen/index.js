import React, {useState} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles'
import Grid from './Grid';
import ActivePlayer from '../players/ActivePlayer'
import Victory from './Victory';
import InactivePlayer from '../players/InactivePlayer';
import ConfettiCannon from 'react-native-confetti-cannon';
import { AntDesign } from '@expo/vector-icons';
import {CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function GameScreen(props) {
  const grid = props.grid
  const me = props.me
  const bigCircle = 85, medCircle = 60, smallCircle = 25
  const currentPlayer = props.room.players[props.room.turnOrder - 1]
  const [isPlaying, setIsPlaying] = useState(true)

  return (
      <SafeAreaView style={{height: '100%', width: '90%', justifyContent: 'center', alignItems: 'flex-end'}}>
        <View style={[styles.safeArea, {alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}]}>
        {props.room.hasTimer && currentPlayer.id === me.id ? <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={props.room.turnTime}
          size={30}
          strokeWidth={2}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 2 })}
        >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 16 }}>
          {remainingTime}
        </Text>
      )}
    </CountdownCircleTimer> : null}
        <TouchableOpacity onPress={() => {props.setGameSettings(true), props.setWaiting(false)}}>
          <AntDesign name="setting" size={30} color="white"  />
        </TouchableOpacity>
        </View>
        <View style={[styles.safeArea, {flex: 10}]}>
          <Grid grid={grid} winningCombo={props.room.winningCombo} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} rows={props.rows} setRows={props.setRows} cols={props.cols} setCols={props.setCols} />

          {props.room.gameEnd ? 
          <Victory socket={props.socket} room={props.room} grid={grid} me={me} currentPlayer={currentPlayer} />
          : 
           currentPlayer.id === me.id ?
            <ActivePlayer {...props} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} grid={grid} player={me} /> 
            : 
            <InactivePlayer player={me} currentTurn={props.currentTurn} currentPlayer={currentPlayer} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} />
            }
            </View>
      </SafeAreaView>
  )
}