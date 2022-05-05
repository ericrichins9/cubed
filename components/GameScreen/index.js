import React, {useState} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles'
import Grid from './Grid';
import ActivePlayer from '../players/ActivePlayer'
import Victory from './Victory';
import InactivePlayer from '../players/InactivePlayer';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function GameScreen(props) {
  const grid = props.grid
  const me = props.me
  const bigCircle = 85, medCircle = 60, smallCircle = 25
  const currentPlayer = props.room.players[props.room.turnOrder - 1]

  return (
      <SafeAreaView style={styles.container}>
          <Grid grid={grid} winningCombo={props.room.winningCombo} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} rows={props.rows} setRows={props.setRows} cols={props.cols} setCols={props.setCols} />

          {props.room.gameEnd ? 
          <Victory me={me} currentPlayer={currentPlayer} />
          : 
           currentPlayer.id === me.id ?
            <ActivePlayer {...props} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} grid={grid} player={me} /> 
            : 
            <InactivePlayer player={me} currentTurn={props.currentTurn} currentPlayer={currentPlayer} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} />
            }
      </SafeAreaView>
  )
}