import React from 'react'
import AnimatedCircle from '../GameScreen/AnimatedCircle'
import {styles} from '../GameScreen/styles'
import { View } from 'react-native';

export default function Player4(props){
    return (
        <View style={styles.myPieces}>
            {props.player.pieces.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((circle, colIndex) => (
                    <View key={colIndex} style={styles.cell}>
                        <AnimatedCircle key={colIndex} color={props.player.color} rowIndex={rowIndex} colIndex={colIndex} circle={circle} {...props} />                    
                    </View>
                    ))}
                </View>
            ))}
        </View>
    )
}