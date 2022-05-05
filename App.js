import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import GameScreen from './components/GameScreen';
import WaitingScreen from './components/PreApp/Waiting';
import PreApp from './components/PreApp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './components/styles'
import JoinGameScreen from './components/PreApp/JoinGame';

//let gameStart = false, gameJoined = false

function HomeScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Join')}
        >
          <Text style={{fontSize: 20}}>Join Game</Text>
        </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [gameJoined, setGameJoined] = useState(false)
  // return(
  //     <GameScreen />
  // )
  return (
    <PreApp />
  );
}

export default App;

