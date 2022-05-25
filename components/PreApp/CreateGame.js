import React, {useState, useEffect} from 'react';
import { TouchableOpacity, KeyboardAvoidingView, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { styles } from '../styles'
import FadeInOut from 'react-native-fade-in-out';
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator'
import { AntDesign } from '@expo/vector-icons';

export default function CreateGame(props) {
  const [roomId, setRoomId] = useState();
  const [name, onChangeName] = useState();
  const isMyTurn = true
  const [codeCopied, setCodeCopied] = useState(false)

  function copyToClipboard(){
    Clipboard.setString(roomId)
    setCodeCopied(true)
  }

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

function randRoom(){
  var result = '';
  var hexChars = '0123456789abcdef';
  for (var i = 0; i < 6; i += 1) {
      result += hexChars[Math.floor(Math.random() * 6)];
  }
  return result;
}

useEffect(() => {setRoomId(randRoom)}, [])

  return (
    <View>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => props.setGameCreated(false)}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, justifyContent: 'space-evenly'}}>
        <View>
          <Text style={styles.screenTitle}>Create Game</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Give this code to friends and have them join:</Text>
          <View style={{width: '50%'}}>
            <TextInput
              value={roomId}
              mode={'outlined'}
              disabled
              textAlign={'center'}
              style={styles.input}
              dense
            />
          </View>
          <TouchableOpacity style={{ padding: 5 }} onPress={copyToClipboard}>
            <Text style={styles.text}>copy</Text>
          </TouchableOpacity>

          <FadeInOut visible={codeCopied} duration={400} scale={true}>
            <Text style={{textAlign: 'center',fontSize: 15,color: '#fff',fontStyle: 'italic'}}> 
              copied to clipboard
            </Text>
          </FadeInOut>
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Give yourself an awesome game name:</Text>
          <View style={{width: '50%'}}>
          <TextInput 
            onChangeText={onChangeName}
            placeholder={"[your name]"}
            textAlign={'center'}
            value={name}
            style={styles.input}
            mode={'outlined'}
            dense
            activeOutlineColor='#333229'
          />
          </View>
          </View>
        

        <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createGame(name, props.pieces, roomId, props.player1)}
        >
          <Text style={styles.buttonText}>Generate Room</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}