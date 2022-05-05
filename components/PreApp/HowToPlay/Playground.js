import React, {useState, useEffect} from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { styles } from '../../styles'
import Grid from '../../GameScreen/Grid'
import ActivePlayer from '../../players/ActivePlayer';

export default function Playground(props) {
  const bigCircle = 85, medCircle = 60, smallCircle = 25  
  const player = {
    id: 'test',
    name: "ME",
    isMyTurn: true,
    color: 'blue',
    pieces: [
        [
            {size: 'big', disabled: false},
            {size: 'med', disabled: false},
            {size: 'small', disabled: false}
        ], //big
        [
            {size: 'big', disabled: false},
            {size: 'med', disabled: false},
            {size: 'small', disabled: false}
        ], //med
        [
            {size: 'big', disabled: false},
            {size: 'med', disabled: false},
            {size: 'small', disabled: false}
        ], //small
    ]
  }  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Playground</Text>
      <Grid {...props}/>
      <ActivePlayer {...props} player={player} bigCircle={bigCircle} medCircle={medCircle} smallCircle={smallCircle} />
    </View>
  );
}