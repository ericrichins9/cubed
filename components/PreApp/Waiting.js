import React, {useState, useEffect} from 'react'
import AnimatedCircle from '../GameScreen/AnimatedCircle'
import { styles } from '../styles'
import { View, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function WaitingScreen(props){

    return (
        <View style={styles.preAppB}>
            <Text> Room Code {props.roomId}</Text>

            <Text>Lobby</Text>
            {Object.keys(props.room).length > 0 && props.room.players.map((player) => {
              return (
                <Text key={player.id}>{player.name}</Text>
              )
            })}   

          {props.isPlayer1 ? <TouchableOpacity
                style={styles.button}
                disabled={props.room.players !== undefined && props.room.players.length < 2 ? true : false}
                onPress={() => socket.emit('startGame', props.roomId)}
          >
            {props.room.players !== undefined && props.room.players.length < 2  ? <Text style={{fontSize: 20}}>Waiting...</Text> : <Text style={{fontSize: 20}}>Start Game!</Text> }
          </TouchableOpacity>
          :
          null }
        </View>
    )
}