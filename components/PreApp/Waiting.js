import React, {useRef, useEffect} from 'react'
import { styles } from '../styles'
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function WaitingScreen(props){
  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.2, 
          duration: 600,
          useNativeDriver: true,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1, 
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

    return (
        <View>
            {props.roomId !== undefined ? 
              <View>
                <Text style={styles.text}> Room Code: </Text> 
                <Text style={styles.text}>{props.roomId}</Text>
              </View>
              : 
            null}

            <View style={styles.grid}>
              <View style={styles.row}>
                <View style={styles.waitingCell}>
                  <View>
                    <Text style={styles.text}>Player 1</Text>
                  </View>
                  {props.room.players !== undefined && props.room.players[0] !== null ?
                    <View style={{flex: 1}}>
                      <View style={{flex: 2, alignItems: 'center'}}>
                        <Animated.View style={[styles.pulsing(70, props.player1), {transform: [{ scale: anim.current }]}]} /> 
                      </View>
                      <View>
                        <Text style={styles.text}>{props.room.players !== undefined && props.room.players[0] !== undefined && props.room.players[0].name}</Text>
                      </View>
                    </View>
                    :
                    <View>
                        <View style={[styles.bigCircle(90, 'grey'), {marginLeft: -45}]} />
                    </View>
                  }
                </View> 
                <View style={styles.waitingCell}>
                  <View>
                    <Text style={styles.text}>Player 2</Text>
                  </View>
                  {props.room.players !== undefined && props.room.players[1] !== undefined ?
                    <View style={{flex: 1}}>
                      <View style={{flex: 2, alignItems: 'center'}}>
                        <Animated.View style={[styles.pulsing(70, props.player2), {transform: [{ scale: anim.current }]}]} /> 
                      </View>
                      <View>
                        <Text style={styles.text}>{props.room.players !== undefined && props.room.players[1] !== undefined && props.room.players[1].name}</Text>
                      </View>
                    </View>
                    :
                    <View>
                        <View style={[styles.bigCircle(75, 'grey'), {marginLeft: -35}]} />
                    </View>
                  }
                </View> 
              </View>
              <View style={styles.row}>
              <View style={styles.waitingCell}>
                  <View>
                    <Text style={styles.text}>Player 3</Text>
                  </View>
                  {props.room.players !== undefined && props.room.players[2] !== undefined ?
                    <View style={{flex: 1}}>
                      <View style={{flex: 2, alignItems: 'center'}}>
                        <Animated.View style={[styles.pulsing(70, props.player3), {transform: [{ scale: anim.current }]}]} /> 
                      </View>
                      <View>
                        <Text style={styles.text}>{props.room.players !== undefined && props.room.players[2] !== undefined && props.room.players[2].name}</Text>
                      </View>
                    </View>
                    :
                    <View>
                        <View style={[styles.bigCircle(75, 'grey'), {marginLeft: -35}]} />
                    </View>
                  }
                </View>
                <View style={styles.waitingCell}>
                  <View>
                    <Text style={styles.text}>Player 4</Text>
                  </View>
                  {props.room.players !== undefined && props.room.players[3] !== undefined ?
                    <View style={{flex: 1}}>
                      <View style={{flex: 2, alignItems: 'center'}}>
                        <Animated.View
                          style={[styles.pulsing(70, props.player4), {transform: [{ scale: anim.current }]}]} 
                          /> 
                      </View>
                      <View>
                        <Text style={styles.text}>{props.room.players !== undefined && props.room.players[3] !== undefined && props.room.players[3].name}</Text>
                      </View>
                    </View>
                    :
                    <View>
                        <View style={[styles.bigCircle(75, 'grey'), {marginLeft: -35}]} />
                    </View>
                  }
                </View> 
              </View>
                {/* <View style = {styles.cell}> {Object.keys(props.room).length === 1 && <Text>{props.room.players[0].name}</Text>}</View>
                <View style = {styles.cell}> {Object.keys(props.room).length === 2 && <Text>{props.room.players[1].name}</Text>}</View>
              </View>
              <View style={styles.row}>
                <View style = {styles.cell}> {Object.keys(props.room).length === 3 && <Text>{props.room.players[2].name}</Text>}</View>
                <View style = {styles.cell}> {Object.keys(props.room).length === 4 && <Text>{props.room.players[3].name}</Text>}</View> */}
              </View>   

          {props.isPlayer1 ? 
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.button, props.room.players !== undefined && props.room.players.length < 2 ? {backgroundColor: '#D3D3D3'} : {backgroundColor: '#fffeec'}]}
              disabled={props.room.players !== undefined && props.room.players.length < 2 ? true : false}
              onPress={() => props.socket.emit('startGame', props.roomId)}
            >
            {props.room.players !== undefined && props.room.players.length < 2  ? 
                <Text style={styles.buttonText}>Waiting...</Text>
                : 
                <Text style={styles.buttonText}>Let's Play!</Text> 
                }
          </TouchableOpacity>
          </View>
          :
          null }
        </View>
    )
}