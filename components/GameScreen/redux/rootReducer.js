const initialState = {
    grid: [
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
    ],
    player1: {
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
    },
    player2: {
        name: 'Player 2',
        turnOrder: 2,
        color: 'red',
        dispatch: 'SET_PLAYER_2',
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
    },
    player3: {
        name: 'Player 3',
        turnOrder: 3,
        color: 'green',
        dispatch: 'SET_PLAYER_3',
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
    },
    player4: {
        name: 'Player 4',
        turnOrder: 4,
        color: 'gold',
        dispatch: 'SET_PLAYER_4',
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
    },
    rows: [],
    cols: [],
    currentTurn: 1,
    hasWon: false
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'SET_ROWS': return { ...state, rows: action.payload }
        case 'SET_COLS': return { ...state, cols: action.payload }
        case 'SET_GRID': return { ...state, grid: action.payload }
        case 'SET_CURRENT_TURN': return { ...state, currentTurn: action.payload }
        case 'SET_PLAYER_1': return { ...state, player1: action.payload }
        case 'SET_PLAYER_2': return { ...state, player2: action.payload }
        case 'SET_PLAYER_3': return { ...state, player3: action.payload }
        case 'SET_PLAYER_4': return { ...state, player4: action.payload }
        case 'SET_VICTORY': return { ...state, hasWon: true }
        default: return state
    }
}