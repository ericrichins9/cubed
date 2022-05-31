import React from 'react';
import { TouchableOpacity, View, Text, Switch } from 'react-native';
import { styles } from '../styles'
import { AntDesign } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

export default function GameSettings(props) {

  const onTimerSwitch = () => props.setHasTimer(!props.hasTimer);
  const onBombsSwitch = () => props.setIsBombed(!props.isBombed);
  const onEggsSwitch = () => props.setIsEgged(!props.isEgged);
  const onCenterSwitch = () => props.setCenterDisabled(!props.centerDisabled);

  function randNum(max) {
    return Math.floor(Math.random() * max);
  }
  function updateGrid(room){
    let newGrid = [...props.grid]
    if(props.centerDisabled) { 
      newGrid[1][1][1].med = true
      newGrid[1][1][1].disabled = true
      newGrid[1][1][1].color = '#D3D3D3'
    }
    else{
      newGrid[1][1][1].med = false
      newGrid[1][1][1].disabled = false
      newGrid[1][1][1].color = ''
    }
    if(props.isBombed){
      for(var i = 0; i < randNum(9); i++){
        newGrid[randNum(3)][randNum(3)][randNum(3)].isBombed = true
      }
    }
    else {
      for(var i = 0; i < newGrid.length; i++){
        for(var j = 0; j < newGrid[i].length; j++){
          for(var k = 0; k < newGrid[i][j].length; k++){
            newGrid[i][j][k].isBombed = false
         }
        }
      }
    }
    if(props.isEgged){
      for(var i = 0; i < randNum(9); i++){
        newGrid[randNum(3)][randNum(3)][randNum(3)].isEgged = true
      }
    }
    else {
      for(var i = 0; i < newGrid.length; i++){
        for(var j = 0; j < newGrid[i].length; j++){
          for(var k = 0; k < newGrid[i][j].length; k++){
            newGrid[i][j][k].isEgged = false
         }
        }
      }
    }
    props.socket.emit('addRules', room, JSON.stringify({ newGrid }), props.hasTimer, props.time);
    props.setGameSettings(false)
    props.setWaiting(true)
  }

  return (
    <View>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => {props.setGameSettings(false), props.gameStart ? props.setGameStart(true) : (props.setWaiting(true), updateGrid(props.room))}}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
      
      <View style={{flex: 1, width: '90%', justifyContent: 'space-evenly'}}>
        <View>
          <Text style={styles.screenTitle}>House Rules</Text>
        </View>

        <View>
          <View style={styles.gameSettingsContainer}>
            <Text style={styles.text}>Disable Center Play</Text>
            <Switch style={{marginLeft: 12}} disabled={props.gameStart} value={props.centerDisabled} onValueChange={onCenterSwitch} />
          </View>
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
              Each players first turn: the center-center grid position is disabled
          </Text>
        </View>
         
        <View>
          <View style={styles.gameSettingsContainer}>
            <Text style={styles.text}>Roulette</Text>
            <Switch style={{marginLeft: 12}} disabled={props.gameStart} value={props.isBombed} onValueChange={onBombsSwitch} />
          </View>
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
              Invisible bombs are placed at random on the grid. If tripped, you risk losing an unplayed piece 
          </Text>
        </View>

        <View>
          <View style={styles.gameSettingsContainer}>
            <Text style={styles.text}>Golden Eggs</Text>
            <Switch style={{marginLeft: 12}} disabled={props.gameStart} value={props.isEgged} onValueChange={onEggsSwitch} />
          </View> 
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
            Invisible eggs are placed at random on the grid. If found, you gain an extra playing piece
          </Text> 
        </View>
        <View>
          <View style={styles.gameSettingsContainer}>
            <Text style={styles.text}>Turn Timer</Text>
            <Picker
              selectedValue={props.time}
              enabled={props.gameStart}
              style={{width: 150, height: 44, backgroundColor: '#0093E9', borderRadius: 8}}
              itemStyle={{height: 44, fontSize: 16, color: 'white'}}
              onValueChange={(itemValue, itemIndex) =>
                props.setTime(itemValue)}>

              <Picker.Item label="14 seconds" value={14} />
              <Picker.Item label="16 seconds" value={16} />
              <Picker.Item label="18 seconds" value={18} />
              <Picker.Item label="20 seconds" value={20} />
              <Picker.Item label="22 seconds" value={22} />
              <Picker.Item label="24 seconds" value={24} />
              <Picker.Item label="26 seconds" value={26} />
              <Picker.Item label="28 seconds" value={28} />
              <Picker.Item label="30 seconds" value={30} />

            </Picker>
            <Switch style={{marginLeft: 12, borderColor: 'white', borderRadius: 1}} value={props.hasTimer} onValueChange={onTimerSwitch} />
          </View>
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
              How long would you like each player to take?
          </Text>
        </View>
      </View>
    </View>
  );
}