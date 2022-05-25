import React from 'react'
import AnimatedCircle from '../GameScreen/AnimatedCircle'
import { styles } from '../styles'
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Grid from '../GameScreen/Grid'

export default function ActivePlayer(props){
    return (
        <GestureHandlerRootView>
            <View>
                <Text style={styles.text}>It's your turn</Text>
            </View>
            <View style={styles.myPieces}>
                {props.player.pieces.map((row, rowIndex) => (
                    <View key={rowIndex} style={{ flex: 1, flexDirection: "column"}}>
                        {row.map((circle, colIndex) => (
                        <View key={colIndex} style={styles.hiddenCell}>
                            <AnimatedCircle key={colIndex} rowIndex={rowIndex} colIndex={colIndex} circle={circle} {...props} />                    
                        </View>
                        ))}
                    </View>
                ))}
            </View>
        </GestureHandlerRootView>
    )
}