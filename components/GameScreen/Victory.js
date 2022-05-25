import React, {useEffect, useRef} from 'react'
import { styles } from '../styles'
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { resetGrid, resetPlayers } from './utils';

export default function Victory(props){
    const anim = useRef(new Animated.Value(1));
 
    useEffect(() => {
      // makes the sequence loop
      Animated.loop(
        // runs given animations in a sequence
        Animated.sequence([
          // increase size
          Animated.timing(anim.current, {
            toValue: 1.2, 
            duration: 800,
            useNativeDriver: true,
          }),
          // decrease size
          Animated.timing(anim.current, {
            toValue: 1, 
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    function handleReset(grid, room, socket, me){
      const newGrid = resetGrid(grid)
      const resetRoom = resetPlayers(room)
      socket.emit('restart', JSON.stringify({ newGrid }), resetRoom, me)
    }
    return (
        <View>
            {props.me.id === props.currentPlayer.id ? 
                <View>
                  <Text style={[styles.text, {marginBottom: 0}]}>Congratulations!</Text>
                  <Text style={styles.text}>Way to Win!</Text>
                </View>  
              : 
                <View>
                  <Text style={styles.text}>{props.currentPlayer.name} won</Text>
                </View>  
            }
            <TouchableOpacity style={[styles.button]}
              onPress={() => handleReset(props.grid, props.room, props.socket, props.me)}>
                <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
        </View>
    )
}