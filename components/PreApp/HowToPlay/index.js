import React, {useState, useEffect} from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { styles } from '../../styles'
import Playground from './Playground'
import Rules from './Rules'

export default function HowToPlay(props) {

  return (
    <View>
      <Rules {...props} />
    </View>
  );
}