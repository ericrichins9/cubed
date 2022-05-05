import React from 'react'
import {styles} from '../styles'
import { View, Text } from 'react-native';
import Grid from '../GameScreen/Grid'

export default function InactivePlayer(props){
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Text style={styles.text}>Waiting for {props.currentPlayer.name} to take their turn...</Text>
            </View>
            <View style={styles.myInactivePieces}>
                    <View style={styles.inactiveRow}>
                    {props.player.pieces.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.hiddenCell}>
                        {!row[0].disabled ? <View style={styles.bigCircle(props.bigCircle, props.player.color)} /> : <View />}
                        {!row[1].disabled ? <View style={styles.medCircle(props.medCircle, props.player.color)} /> : <View />}
                        {!row[2].disabled ? <View style={styles.smallCircle(props.smallCircle, props.player.color)} /> : <View />}
                    </View>
                    ))}
                    </View>
            </View>
        </View>
    )
}