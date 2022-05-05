export default function checkVictory(grid){
    let winningCombo
    const victoryCombinations = [
        [0,1,2], [3,4,5], [6,7,8], //individual cell combos (row 1)
        [9,10,11], [12,13,14], [15,16,17], //individual cell combos (row 2)
        [18,19,20], [21,22,23], [24,25,26], //individual cell combos (row 3)
        [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6], //row 1 combinations
        [9,12,15], [10,13,16], [11,14,17], [9,13,17], [11,13,15], //row 2 combos
        [18,21,24], [19,22,25], [20,23,26], [18,22,26], [20,22,24], //row 3 combos
        [0,9,18], [1,10,19], [2,11,20], [0,10,20], [2,10,18], //column 1 combo
        [3,12,21], [4,13,22], [5,14,23], [3,13,23], [5,13,21], //column 2 combo
        [6,15,24], [7,16,25], [8,17,26], [6,16,26], [8,16,24],//column 3 combo
        [0,12,24], [1,13,25], [2,14,26], [0,13,26], [2,13,24], //diag combos #1 (top left to bottom right)
        [6,12,18], [7,13,19], [8,14,20], [6,13,20], [8,13,18], //diag combos #2
    ]

    victoryCombinations.map((victoryCombo) => {
        let combo1, combo2, combo3
            grid.map((row) => {
                row.map((cell) => {
                    cell.map((circle) => {
                        if (circle.id === victoryCombo[0]) {combo1 = circle}
                        if (circle.id === victoryCombo[1]) {combo2 = circle}
                        if (circle.id === victoryCombo[2]) {combo3 = circle}
                    })

                    if (combo1 !== undefined && combo2 !== undefined && combo3 !== undefined){
                        if(combo1.color !== '' && combo1.color === combo2.color && combo2.color === combo3.color){
                            winningCombo = [combo1, combo2, combo3]
                        }
                    }
            })
        })
    })
    return winningCombo
}

