import React, {useEffect, useRef} from 'react'
import { styles } from '../styles'
import { View, Text, TouchableOpacity, Animated } from 'react-native';

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

    return (
        <View>
            {props.me.id === props.currentPlayer.id ? 
                <View>
                  <Text style={styles.text}>Congratulations! Way to Win!</Text>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => console.log("DONE")}
                  >
                   <Text style={styles.buttonText}>Play Again</Text>
                  </TouchableOpacity>
                </View>  
              : 
                <View>
                  <Text style={styles.text}>{props.currentPlayer.name} won</Text>
                  <TouchableOpacity
                      style={styles.button}
                      onPress={() => console.log("DONE")}
                  >
                   <Text style={styles.buttonText}>Play Again</Text>
                  </TouchableOpacity>
                </View>  
            }
        </View>
    )
}