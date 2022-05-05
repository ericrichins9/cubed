import React, {useEffect, useState, useRef} from 'react'
import { View, Animated } from 'react-native';
import NativeIntentAndroid from 'react-native/Libraries/Linking/NativeIntentAndroid';
import { styles } from '../../styles'

export default function DemoGrid(props) {
    const [rows, setRows] = useState([])
    const [cols, setCols] = useState([])
    const [grid, setGrid] = useState([
        [
            [
                {id: 0, big: false, color: ''},
                {id: 1, med: true, color: props.player2},
                {id: 2, small: true, color: props.player3},
            ], // cell 1
            [
                {id: 3, big: false, color: ''},
                {id: 4, med: true, color: props.player3},
                {id: 5, small: true, color: props.player4},
            ], // cell 2
            [
                {id: 6, big: true, color: props.player2},
                {id: 7, med: true, color: props.player2},
                {id: 8, small: true, color: props.player4},
            ], // cell 3
        ], // row 1 
        [
            [
                {id: 9, big: false, color: ''},
                {id: 10, med: true, color: props.player3},
                {id: 11, small: false, color: ''},
            ], // cell 4
            [
                {id: 12, big: true, color: props.player4},
                {id: 13, med: false, color: ''},
                {id: 14, small: false, color: ''},
            ], // cell 5
            [
                {id: 15, big: true, color: props.player4},
                {id: 16, med: true, color: props.player2},
                {id: 17, small: false, color: ''},
            ], // cell 6
        ], // row 2
        [
            [
                {id: 18, big: false, color: ''},
                {id: 19, med: true, color: props.player4},
                {id: 20, small: false, color: ''},
            ], // cell 7
            [
                {id: 21, big: false, color: ''},
                {id: 22, med: false, color: ''},
                {id: 23, small: false, color: ''},
            ], // cell 8
            [
                {id: 24, big: false, color: ''},
                {id: 25, med: false, color: ''},
                {id: 26, small: true, color: props.player4},
            ], // cell 9
        ], // row 3
      ])


    const anim = useRef(new Animated.Value(1));

    useEffect(() => {
        grid.map((row, rIdx) => {
             row.map((cell, cellIdx) => {
                cell.map((circle, circleIdx) => {
                    if(circle.hasOwnProperty('big') && (circle.id === props.winningCombo[0] || circle.id === props.winningCombo[1] || circle.id === props.winningCombo[2])){
                        const newCircle = {id: circle.id, big: true, color: props.player1}
                        const newGrid = [...grid]
                        newGrid[rIdx][cellIdx][circleIdx] = newCircle
                        setGrid(newGrid)
                    }
                    else if(circle.hasOwnProperty('med') && (circle.id === props.winningCombo[0] || circle.id === props.winningCombo[1] || circle.id === props.winningCombo[2])){
                        const newCircle = {id: circle.id, med: true, color: props.player1}
                        const newGrid = [...grid]
                        newGrid[rIdx][cellIdx][circleIdx] = newCircle
                        setGrid(newGrid)
                    }
                    else if(circle.hasOwnProperty('small') && (circle.id === props.winningCombo[0] || circle.id === props.winningCombo[1] || circle.id === props.winningCombo[2])){
                        const newCircle = {id: circle.id, small: true, color: props.player1}
                        const newGrid = [...grid]
                        newGrid[rIdx][cellIdx][circleIdx] = newCircle
                        setGrid(newGrid)
                    }
                })
            })
        })
      // makes the sequence loop
      Animated.loop(
        // runs given animations in a sequence
        Animated.sequence([
          // increase size
          Animated.timing(anim.current, {
            toValue: 1.2, 
            duration: 600,
            useNativeDriver: true,
          }),
          // decrease size
          Animated.timing(anim.current, {
            toValue: 1, 
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

    function setGridDimensions(location){
        const width = location.width / 3
        const newRows = [...rows]
        newRows[0] = (location.y + 45)
        newRows[1] = (width + location.y + 45)
        newRows[2] = ((width * 2) + location.y + 45)
        newRows[3] = (location.height + location.y + 45)
        setRows(newRows)
        const newCols = [...cols]
        newCols[0] = (location.x + 40)
        newCols[1] = (width + location.x + 40)
        newCols[2] = ((width * 2) + location.x + 40)
        newCols[3] = (location.height + location.x + 40)
        setCols(newCols)
    }

  return (
    <View style={styles.grid} onLayout={({ nativeEvent}) => {
        setGridDimensions(nativeEvent.layout)}}> 
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.cell}>
                    {cell[0].big &&
                        (cell[0].id === props.winningCombo[0] || cell[0].id === props.winningCombo[1] || cell[0].id === props.winningCombo[2]) 
                    ? 
                    <Animated.View style={[styles.pulsing(85, cell[0].color), {transform: [{ scale: anim.current }]}]} />
                    : 
                    cell[0].big ? <View style={styles.bigCircle(85, cell[0].color)} /> : <View />}

                    {cell[1].med &&
                        (cell[1].id === props.winningCombo[0] || cell[1].id === props.winningCombo[1] || cell[1].id === props.winningCombo[2]) 
                    ? 
                    <Animated.View style={[styles.pulsing(60, cell[1].color), {transform: [{ scale: anim.current }]}]} />
                    :
                    cell[1].med ? <View style={styles.medCircle(60, cell[1].color)} /> : <View />}
                    
                    {cell[2].small &&
                        (cell[2].id === props.winningCombo[0] || cell[2].id === props.winningCombo[1] || cell[2].id === props.winningCombo[2]) 
                    ?
                    <Animated.View style={[styles.pulsing(25, cell[2].color), {transform: [{ scale: anim.current }]}]} /> 
                    :
                    cell[2].small ? <View style={styles.smallCircle(25, cell[2].color)} /> : <View />}
                </View>
                ))}
            </View>    
          ))}
    </View>
  );
}