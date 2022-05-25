import React from 'react';
import { TouchableOpacity, View, Text, TextInput, StatusBar } from 'react-native';
import { styles } from '../../styles'
import Swiper from 'react-native-swiper';
import DemoGrid from './DemoGrid'
import { AntDesign } from '@expo/vector-icons';

export default function Rules(props) {

  return (
    <View>      
      <TouchableOpacity style={{marginTop: 30, marginLeft: 25}} onPress={() => props.setHowToPlay(false)}>
        <AntDesign name="leftcircle" size={34} color="white" />
      </TouchableOpacity>
      <View style={[styles.container, {flex: 1}]}>
          <Swiper
            dot={
              <View style={{ backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7, }} />
            }
            activeDot={
              <View style={{ backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />
            }
            paginationStyle={{ bottom: 30, flex: 1, alignItems: 'center', justifyContent: 'center'}}
            loop={false}
          >
            <View style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
              <Text style={styles.rulesText}>It's like Tic Tac Toe, but with three ways to win...</Text>
            </View>
            <View style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
              <DemoGrid winningCombo={[0,12,24]} player1={props.player1} player2={props.player2} player3={props.player3} player4={props.player4} />
              <Text style={styles.rulesText}>Get three in a row with any three that are the same size! </Text>
            </View>
            <View style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
              <DemoGrid winningCombo={[9,13,17]} player1={props.player1} player2={props.player2} player3={props.player3} player4={props.player4}/>
              <Text style={[styles.rulesText, {marginBottom: 12, marginTop: 12}]}>Get three in a row with any three of different sizes!</Text>
              <Text style={[styles.rulesText, {marginBottom: 12, marginTop: 12}]}>either: big, medium, small</Text>
              <Text style={[styles.rulesText, {marginBottom: 12, marginTop: 12}]}>OR...</Text>
            </View>
            <View style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
              <DemoGrid winningCombo={[20,13,6]} player1={props.player1} player2={props.player2} player3={props.player3} player4={props.player4}/>
              <Text style={styles.rulesText}>small, medium, big </Text>
            </View>
            <View style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
              <DemoGrid winningCombo={[21,22,23]} player1={props.player1} player2={props.player2} player3={props.player3} player4={props.player4} />
              <Text style={styles.rulesText}>Get three in a row with any three that are in the same square!</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.setHowToPlay(false)}
              >
                <Text style={styles.buttonText}>Let's Play!</Text>
              </TouchableOpacity>
            </View>
          </Swiper>
      </View>
    </View>
  );
}