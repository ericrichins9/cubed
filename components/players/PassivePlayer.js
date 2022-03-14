import React from 'react'
import AnimatedCircle from '../GameScreen/AnimatedCircle'
import {styles} from '../styles'
import { View, Text } from 'react-native';

export default function PassivePlayer(props){
    //console.log("PLAYER 2", props.player)
    return (
        <View style={styles.myInactivePieces}>
                <View style={styles.inactiveRow}>
                {props.player.pieces.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.inactiveCell}>
                      {!row[0].disabled ? <View style={styles.bigCircle(props.bigCircle, props.player.color)} /> : <View />}
                      {!row[1].disabled ? <View style={styles.medCircle(props.medCircle, props.player.color)} /> : <View />}
                      {!row[2].disabled ? <View style={styles.smallCircle(props.smallCircle, props.player.color)} /> : <View />}
                  </View>
                ))}
                </View>

            {/* {props.player.pieces.map((row, rowIndex) => (
          
              row.map((piece, cellIndex) => (
                  <View key={cellIndex} style={styles.inactiveCell}>
                      {!piece.disabled ? <View style={styles.bigCircle(props.bigCircle, props.player.color)} /> : <View />}
                      {!piece.disabled ? <View style={styles.medCircle(props.medCircle, props.player.color)} /> : <View />}
                      {!piece.disabled ? <View style={styles.smallCircle(props.smallCircle, props.player.color)} /> : <View />}
                  </View>
              )) 
          ))} */}
            
        </View>
    )
}