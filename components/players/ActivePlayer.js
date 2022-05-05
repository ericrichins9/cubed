import React from 'react'
import AnimatedCircle from '../GameScreen/AnimatedCircle'
import { styles } from '../styles'
import { View } from 'react-native';
import Grid from '../GameScreen/Grid'

export default function ActivePlayer(props){
    return (
        <View>
            <View style={styles.myPieces}>
                {props.player.pieces.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.rowPieces}>
                        {row.map((circle, colIndex) => (
                        <View key={colIndex} style={styles.hiddenCell}>
                            <AnimatedCircle key={colIndex} rowIndex={rowIndex} colIndex={colIndex} circle={circle} {...props} />                    
                        </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    )
}