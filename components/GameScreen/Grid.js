import React, {useEffect, useRef, createRef} from 'react'
import { View, Animated, StatusBar } from 'react-native';
import { styles } from '../styles'

export default function Grid(props) {
    const anim = useRef(new Animated.Value(1));
    const gridView = createRef(null)
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

      gridView.current.measure((x, y, width, height, pageX, pageY) => {
        const rowWidth = width / 3
        const newRows = [...props.rows]
        newRows[0] = (pageY + StatusBar.currentHeight)
        newRows[1] = (rowWidth + pageY + StatusBar.currentHeight)
        newRows[2] = ((rowWidth * 2) + pageY + StatusBar.currentHeight)
        newRows[3] = (width + pageY + StatusBar.currentHeight)
        //console.log("ROWS", newRows)
        props.setRows(newRows)
        const newCols = [...props.cols]
        newCols[0] = (pageX)
        newCols[1] = (rowWidth + pageX)
        newCols[2] = ((rowWidth * 2) + pageX)
        newCols[3] = (width + pageX)
        //console.log("COLS", newCols)
        props.setCols(newCols)
        })
    }, []);  

  return (
    <View style={styles.grid} ref={gridView}>
          {props.grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.cell}>
                    {props.winningCombo.length === 3 && cell[0].big &&
                        (cell[0].id === props.winningCombo[0].id || cell[0].id === props.winningCombo[1].id || cell[0].id === props.winningCombo[2].id) 
                    ? 
                    <Animated.View style={[styles.pulsing(props.bigCircle, cell[0].color), {transform: [{ scale: anim.current }]}]} /> 
                    : 
                    cell[0].big ? <View style={styles.bigCircle(props.bigCircle, cell[0].color)} /> : <View />}

                    {props.winningCombo.length === 3 && cell[1].med &&
                        (cell[1].id === props.winningCombo[0].id || cell[1].id === props.winningCombo[1].id || cell[1].id === props.winningCombo[2].id) 
                    ? 
                    <Animated.View style={[styles.pulsing(props.medCircle, cell[1].color), {transform: [{ scale: anim.current }]}]} />
                    :
                    cell[1].med ? <View style={styles.medCircle(props.medCircle, cell[1].color)} /> : <View />}
                    
                    {props.winningCombo.length === 3 && cell[2].small &&
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