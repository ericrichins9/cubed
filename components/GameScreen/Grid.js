import React, {useEffect, useRef} from 'react'
import { View, Animated } from 'react-native';
import { styles } from '../styles'

export default function Grid(props) {
    const anim = useRef(new Animated.Value(1));

    useEffect(() => {
      // makes the sequence loop
      Animated.loop(
        // runs given animations in a sequence
        Animated.sequence([
          // increase size
          Animated.timing(anim.current, {
            toValue: 1.2, 
            duration: 800,
            useNativeDriver: true,
          }),
          // decrease size
          Animated.timing(anim.current, {
            toValue: 1, 
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    function setGridDimensions(location){
        const width = location.width / 3
        const newRows = [...props.rows]
        newRows[0] = (location.y + 45)
        newRows[1] = (width + location.y + 45)
        newRows[2] = ((width * 2) + location.y + 45)
        newRows[3] = (location.height + location.y + 45)
        props.setRows(newRows)
        const newCols = [...props.cols]
        newCols[0] = (location.x + 40)
        newCols[1] = (width + location.x + 40)
        newCols[2] = ((width * 2) + location.x + 40)
        newCols[3] = (location.height + location.x + 40)
        props.setCols(newCols)
    }

  return (
    <View style={styles.grid} onLayout={({ nativeEvent}) => {
        setGridDimensions(nativeEvent.layout)}}> 
          {props.grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.cell}>
                    {props.winningCombo !== undefined && cell[0].big &&
                        (cell[0].id === props.winningCombo[0].id || cell[0].id === props.winningCombo[1].id || cell[0].id === props.winningCombo[2].id) 
                    ? 
                    <Animated.View style={[styles.pulsing(props.bigCircle, cell[0].color), {transform: [{ scale: anim.current }]}]} /> 
                    : 
                    cell[0].big ? <View style={styles.bigCircle(props.bigCircle, cell[0].color)} /> : <View />}

                    {props.winningCombo !== undefined && cell[1].med &&
                        (cell[1].id === props.winningCombo[0].id || cell[1].id === props.winningCombo[1].id || cell[1].id === props.winningCombo[2].id) 
                    ? 
                    <Animated.View style={[styles.pulsing(props.medCircle, cell[1].color), {transform: [{ scale: anim.current }]}]} />
                    :
                    cell[1].med ? <View style={styles.medCircle(props.medCircle, cell[1].color)} /> : <View />}
                    
                    {props.winningCombo !== undefined && cell[2].small &&
                        (cell[2].id === props.winningCombo[0].id || cell[2].id === props.winningCombo[1].id || cell[2].id === props.winningCombo[2].id) 
                    ? 
                    <Animated.View style={[styles.pulsing(props.smallCircle, cell[2].color), {transform: [{ scale: anim.current }]}]} />
                    :
                    cell[2].small ? <View style={styles.smallCircle(props.smallCircle, cell[2].color)} /> : <View />}
                </View>
                ))}
            </View>    
          ))}
    </View>
  );
}