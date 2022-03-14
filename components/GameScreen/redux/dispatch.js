export const setGamePieces = (data, currentDispatch) => {
    //console.log("PIECES SET", data)
    return {
        type: currentDispatch,
        payload: data
    }
  }
export const setGrid = (data) => {
    //console.log("GRID SET", data)
    return {
        type: 'SET_GRID',
        payload: data
    }
  }
export const setVictory = (data) => {
    //console.log("Check Victory Set", data)
    return {
        type: 'SET_VICTORY',
        payload: data
    }
  }
export const setCurrentTurn = (data) => {
    {data === 4 ? data = 1 : data = data + 1}
    return {
        type: 'SET_CURRENT_TURN',
        payload: data
    }
  }