import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import GameScreen from './components/GameScreen';
import WaitingScreen from './components/GameScreen/Waiting';
import PreApp from './components/PreApp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './components/styles'
import io from 'socket.io-client';
import JoinGame from './components/PreApp/JoinGame';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './components/GameScreen/redux/rootReducer'

const store = createStore(rootReducer)

const socket = io('http://localhost:3000');
// const [gameStart, setGameStart] = useState(false)
//   const [gameJoined, setGameJoined] = useState(false)
let gameStart = false, gameJoined = false

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Join a Game')}
        >
          <Text style={{fontSize: 20}}>Join Game</Text>
        </TouchableOpacity>
    </View>
  );
}

function JoinGameScreen({ navigation }) {
  const [roomId, setRoomId] = useState("ROOM ID")
  const [name, onChangeName] = useState("Useless Text");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [color, setColor] = useState()
  const playerPieces = [
    [
        {size: 'big', disabled: false},
        {size: 'big', disabled: false},
        {size: 'big', disabled: false}
    ], //big
    [
        {size: 'med', disabled: false},
        {size: 'med', disabled: false},
        {size: 'med', disabled: false}
    ], //med
    [
        {size: 'small', disabled: false},
        {size: 'small', disabled: false},
        {size: 'small', disabled: false}
    ], //small
]

  function joinGame(name, color, pieces){
    console.log("NUMBER", numberOfPlayers)
    if(numberOfPlayers < 5){
      socket.emit('newPlayer',  {name, color, pieces})
      setNumberOfPlayers(numberOfPlayers + 1)
      navigation.navigate('GameScreen')
    }
    else alert("Sorry, this game is full")
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Join Game</Text>

      <TextInput
        style={styles.input}
        onChangeText={setRoomId}
        value={roomId}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />
      <Picker
      selectedValue={color}
      style={{ marginBottom: 100, height: 50, width: 150 }}
      onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
      >
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Yellow" value="yellow" />
      </Picker>
      <TouchableOpacity
            style={styles.button}
            onPress={() => joinGame(name, color, playerPieces)}
        >
          <Text style={{fontSize: 20}}>Join Game!</Text>
        </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return(
    <Provider store={store}>
      <GameScreen />
    </Provider>
  )
  // return (
  //   gameStart ? <GameScreen /> : 
  //   gameJoined ? <WaitingScreen /> : 
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen name="Join a Game" component={JoinGameScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

export default App;

