export function isInGrid(x, y, rows, cols){
    if((y > rows[3] && y < rows[0]) && (x > cols[3] && x < cols[0])){
        return true
    }
    else { return false }
}

export function cellIsEmpty(x, y, grid, row, col, size){
    console.log("GRID", row, col, size)
    if(size === 'big' && !grid[row][col][0].big === true){ return true }
    else if (size === 'med' && !grid[row][col][1].med === true){ return true }
    else if (size === 'small' && !grid[row][col][2].small === true){ return true }
    else { return false }
}

export function findCellLocation(e, row){
    let returnVal = 4
    if(e > row[2] && e < row[3]){returnVal = 2}//third row OR col
    else if (e > row[1] && e < row[2]){returnVal = 1}//console.log("Second ROW or Col")
    else if (e > row[0] && e < row[1]){returnVal = 0} //console.log("First ROW or Col")
    return returnVal
    }