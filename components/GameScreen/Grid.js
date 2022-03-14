import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles'

export default function Grid(props) {
    //console.log("PROPS", props.grid)
    const setRows = (data) => {
        return {
            type: 'SET_ROWS',
            payload: data
        }
    }
    const setCols = (data) => {
        return {
            type: 'SET_COLS',
            payload: data
        }
    }

    function setGridDimensions(location){
        const width = location.width / 3
        const newRows = [...props.rows]
        newRows[0] = (location.y)
        newRows[1] = (width + location.y)
        newRows[2] = ((width * 2) + location.y)
        newRows[3] = (location.height + location.y)
        props.setRows(newRows)
        const newCols = [...props.cols]
        newCols[0] = (location.x)
        newCols[1] = (width + location.x)
        newCols[2] = ((width * 2) + location.x)
        newCols[3] = (location.height + location.x)
        props.setCols(newCols)
    }

  return (
    <View style={styles.grid} onLayout={({ nativeEvent}) => {
        setGridDimensions(nativeEvent.layout)}}> 
          {props.grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                  <View key={cellIndex} style={styles.cell}>
                      {cell[0].big ? <View style={styles.bigCircle(props.bigCircle, cell[0].color)} /> : <View />}
                      {cell[1].med ? <View style={styles.medCircle(props.medCircle, cell[1].color)} /> : <View />}
                      {cell[2].small ? <View style={styles.smallCircle(props.smallCircle, cell[2].color)} /> : <View />}
                  </View>
              ))}
          </View>    
          ))}
      </View>
  );
}