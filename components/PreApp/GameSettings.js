import React, {useState, useEffect} from 'react';
import { TouchableOpacity, KeyboardAvoidingView, View, Text, Switch } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { styles } from '../styles'
import FadeInOut from 'react-native-fade-in-out';
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator'
import { AntDesign } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

export default function GameSettings(props) {
  const [roomId, setRoomId] = useState();
  const [name, onChangeName] = useState();
  const [isTimer, setIsTimer] = useState(false);
  const [isBombs, setIsBombs] = useState(false);
  const [isEggs, setIsEggs] = useState(false);
  const [centerDisabled, setCenterDisabled] = useState(false);
  const [time, setTime] = useState();
  const [bombs, setBombs] = useState();
  const [eggs, setEggs] = useState();

  const onTimerSwitch = () => setIsTimer(!isTimer);
  const onBombsSwitch = () => setIsBombs(!isBombs);
  const onEggsSwitch = () => setIsEggs(!isEggs);
  const onCenterSwitch = () => setCenterDisabled(!centerDisabled);

  function createGame(name, pieces, room, color){
    if(name === undefined){name = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      style: 'capital',
      separator: ' '
    })}
    props.socket.emit('createRoom', room, name, isMyTurn, pieces, color);
    props.setRoomId(room)
    props.setIsPlayer1(true)
    props.setWaiting(true)
    props.setGameCreated(false)
  }

  return (
    <View>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => {props.setGameSettings(false), props.setWaiting(true)}}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, width: '90%', justifyContent: 'space-evenly'}}>
        <View>
          <Text style={styles.screenTitle}>House Rules</Text>
        </View>

        <View>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.text}>Disable Center Play</Text>
            <Switch style={{marginLeft: 12}} value={centerDisabled} onValueChange={onCenterSwitch} />
          </View>
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
              Each players first turn: the center-center grid position is disabled
          </Text>
        </View>
        <View>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.text}>Turn Timer</Text>
            <Picker
                  selectedValue={time}
                  style={{width: 150, height: 44, backgroundColor: '#0093E9', borderRadius: 8}}
                  itemStyle={{height: 44, fontSize: 16, color: 'white'}}
                  onValueChange={(itemValue, itemIndex) =>
                      setTime(itemValue)
              }>
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
            <Switch style={{marginLeft: 12, borderColor: 'white', borderRadius: 1}} value={isTimer} onValueChange={onTimerSwitch} />
          </View>
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
              How long would you like each player to take?
          </Text>
        </View>
         
        <View>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.text}>Roulette</Text>
            <Picker
                  selectedValue={bombs}
                  style={{width: 150, height: 44, backgroundColor: '#0093E9', borderRadius: 8}}
                  itemStyle={{height: 44, fontSize: 16, color: 'white'}}
                  onValueChange={(itemValue, itemIndex) =>
                      setBombs(itemValue)
                  }>
                  <Picker.Item label="1 bomb" value={1} />
                  <Picker.Item label="2 bombs" value={2} />
                  <Picker.Item label="3 bombs" value={3} />
                  <Picker.Item label="4 bombs" value={4} />
                  <Picker.Item label="5 bombs" value={5} />
              </Picker>
            <Switch style={{marginLeft: 12}} value={isBombs} onValueChange={onBombsSwitch} />
          </View>
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
              Invisible bombs are placed at random on the grid. If found, you risk losing an unplayed piece 
          </Text>
        </View>

        <View>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={styles.text}>Golden Eggs</Text>
            <Picker
                  selectedValue={eggs}
                  style={{width: 150, height: 44, backgroundColor: '#0093E9', borderRadius: 8}}
                  itemStyle={{height: 44, fontSize: 16, color: 'white'}}
                  onValueChange={(itemValue, itemIndex) =>
                      setEggs(itemValue)
                  }>
                  <Picker.Item label="1 egg" value={1} />
                  <Picker.Item label="2 eggs" value={2} />
                  <Picker.Item label="3 eggs" value={3} />
                  <Picker.Item label="4 eggs" value={4} />
                  <Picker.Item label="5 eggs" value={5} />
              </Picker>
            <Switch style={{marginLeft: 12}} value={isEggs} onValueChange={onEggsSwitch} />
          </View> 
          <Text style={{fontSize: 14, color: '#fff', fontStyle: 'italic', textAlign: 'center', margin: 10}}>
            Invisible eggs are placed at random on the grid. If found, you gain an extra playing piece
          </Text> 
        </View>
        <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createGame(name, props.pieces, roomId, props.player1)}
        >
          <Text style={styles.buttonText}>Save Settings</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}