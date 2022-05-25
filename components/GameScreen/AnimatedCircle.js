import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue, useAnimatedStyle, withSpring,} from 'react-native-reanimated';
import checkVictory from './checkVictory';

export default function AnimatedCircle(props) {
  let circleSize

  if(props.circle.size === 'big'){
    circleSize = props.bigCircle
  }
  else if(props.circle.size === 'med'){
    circleSize = props.medCircle
  }
  else if (props.circle.size === 'small'){
    circleSize = props.smallCircle
  }

  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const newVals = useSharedValue({x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offset.value.x) },
        { translateY: withSpring(offset.value.y) },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
    };
  });
  
  const gesture = Gesture.Pan()
    .onBegin((e) => {
      'worklet';
      isPressed.value = true
      newVals.value = {
        x: e.absoluteX - e.x,
        y: e.absoluteY - e.y
      }
    })

    .onChange((e) => {
      'worklet';
        offset.value = {
          x: e.changeX + offset.value.x,
          y: e.changeY + offset.value.y,
      }
    })
    .onTouchesUp(() => {
      'worklet'
      isPressed.value = false
    })
    
    .onEnd((e) => {
      'worklet';
      const row = findCellLocation(e.absoluteY, props.rows)
      const col = findCellLocation(e.absoluteX, props.cols)
      const needsToMoveX = e.absoluteX - newVals.value.x - e.absoluteX + props.cols[col] + ((props.cols[col + 1] - props.cols[col] - circleSize) / 2) 
      const needsToMoveY = e.absoluteY - newVals.value.y - e.absoluteY + props.rows[row] + ((props.rows[row + 1] - props.rows[row] - circleSize) / 2)

      //console.log("ENDING", e.absoluteX, e.absoluteY, row, col)
      function findCellLocation(e, row){
        let returnVal = 4
        if(e > row[2] && e < row[3]){returnVal = 2}//third row OR col
        else if (e > row[1] && e < row[2]){returnVal = 1}//console.log("Second ROW or Col")
        else if (e > row[0] && e < row[1]){returnVal = 0} //console.log("First ROW or Col")
        return returnVal
        }
      
      function cellIsEmpty(x, y, grid, row, col, size){
        if(size === 'big' && !grid[row][col][0].big === true){ return true }
        else if (size === 'med' && !grid[row][col][1].med === true){ return true }
        else if (size === 'small' && !grid[row][col][2].small === true){ return true }
        else { return false }
      }
      //if animated circle is in grid AND dropped cell is not filled: 
      // set move animated circle AND setGrid, setpieces, setcurrentplayer, etc.
      // else animated circle back to original position

      if(row < 4 && col < 4 && cellIsEmpty(e.absoluteX, e.absoluteY, props.grid, row, col, props.circle.size)){
        offset.value = {
          x: needsToMoveX, //x is cols
          y: needsToMoveY //y is rows
        }
        runOnJS(updateGrid)(row, col, props.circle.size)
      }
      else { offset.value = {x:0, y: 0} }

      isPressed.value = false;      
    });
  
  function updateGrid(row, col, size){
    const newBig = {...props.grid[row][col][0]}
    const newMed = {...props.grid[row][col][1]}
    const newSmall = {...props.grid[row][col][2]}
    const newGrid = [...props.grid]
    const newMe = {...props.player}
    newMe.pieces[props.rowIndex][props.colIndex].disabled = true
  
    if (size === 'big') {
      newBig.big = true
      newBig.color = props.player.color
      newGrid[row][col][0] = newBig
    }
    else if (size === 'med') {
      newMed.med = true
      newMed.color = props.player.color
      newGrid[row][col][1] = newMed
    }
    else if (size === 'small') {
      newSmall.small = true
      newSmall.color = props.player.color
      newGrid[row][col][2] = newSmall
    }

    setTimeout(
      () => {
        const hasWon = checkVictory(props.grid)
        props.socket.emit('reqTurn', JSON.stringify({ newGrid }), newMe, props.room, hasWon)
      }, 
      700
    )
  } 

  function getStyleSize(size){
    if(size === 'big') {return styles.bigCircle(props.bigCircle, props.player.color)}
    else if(size === 'med') {return styles.medCircle(props.medCircle, props.player.color)}
    else if(size === 'small') {return styles.smallCircle(props.smallCircle, props.player.color)}
  }

  return (
    <GestureDetector gesture={gesture}>
      {!props.circle.disabled ? 
        <Animated.View 
          //pointerEvents = {props.circle.disabled ? "none" : ''} 
          style={[getStyleSize(props.circle.size),animatedStyles]} /> 
        : 
        <View />
      }
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  
  bigCircle: (bigCircle, color) => ({
    width: bigCircle,
    height: bigCircle,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: color,
}),
  medCircle: (medCircle, color) => ({
      width: medCircle,
      height: medCircle,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 6,
      borderColor: color,
      marginTop: 8
  }),
  smallCircle: (smallCircle, color) => ({
      width: smallCircle,
      height: smallCircle,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 5,
      borderColor: color,
      backgroundColor: color,
  }),
  });