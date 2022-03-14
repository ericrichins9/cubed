import React, {useState, useEffect} from 'react';
import { TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { styles } from '../styles'
import JoinGame from './JoinGame'

export default function PreApp(props) {

const onPress = () => {return(<JoinGame socket={props.socket} pieces={playerPieces} />)};

  return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("HELLO")}
        >
          <Text style={{fontSize: 20}}>Create Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
          <Text style={{fontSize: 20}}>Join Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={console.log("HELLO")}
        >
          <Text style={{fontSize: 20}}>How to Play</Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}