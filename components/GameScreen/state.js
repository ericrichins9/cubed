import React, {useState} from 'react'

export const [grid, setGrid] = useState([
    [
        [
            {id: 0, big: false, color: '', isActive: false},
            {id: 1, med: false, color: '', isActive: false},
            {id: 2, small: false, color: '', isActive: false},
        ], // cell 1
        [
            {id: 3, big: false, color: '', isActive: false},
            {id: 4, med: false, color: '', isActive: false},
            {id: 5, small: false, color: '', isActive: false},
        ], // cell 2
        [
            {id: 6, big: false, color: '', isActive: false},
            {id: 7, med: false, color: '', isActive: false},
            {id: 8, small: false, color: '', isActive: false},
        ], // cell 3
    ], // row 1 
    [
        [
            {id: 9, big: false, color: '', isActive: false},
            {id: 10, med: false, color: '', isActive: false},
            {id: 11, small: false, color: '', isActive: false},
        ], // cell 4
        [
            {id: 12, big: false, color: '', isActive: false},
            {id: 13, med: false, color: '', isActive: false},
            {id: 14, small: false, color: '', isActive: false},
        ], // cell 5
        [
            {id: 15, big: false, color: '', isActive: false},
            {id: 16, med: false, color: '', isActive: false},
            {id: 17, small: false, color: '', isActive: false},
        ], // cell 6
    ], // row 2
    [
        [
            {id: 18, big: false, color: '', isActive: false},
            {id: 29, med: false, color: '', isActive: false},
            {id: 20, small: false, color: '', isActive: false},
        ], // cell 7
        [
            {id: 21, big: false, color: '', isActive: false},
            {id: 22, med: false, color: '', isActive: false},
            {id: 23, small: false, color: '', isActive: false},
        ], // cell 8
        [
            {id: 24, big: false, color: '', isActive: false},
            {id: 25, med: false, color: '', isActive: false},
            {id: 26, small: false, color: '', isActive: false},
        ], // cell 9
    ], // row 3
  ])

  export const [player1, setPlayer1] = useState({
    name: 'Player 1',
    turnOrder: 1,
    color: 'blue',
    dispatch: 'SET_PLAYER_1',
    pieces: [
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
})

export const [player2, setPlayer2] = useState({
    name: 'Player 2',
    turnOrder: 2,
    color: 'red',
    pieces: [
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
})