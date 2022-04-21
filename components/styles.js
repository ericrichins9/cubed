import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    //universal
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3EBF8'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        borderRadius: 12,
        padding: 10,
        marginTop: 40
      },

    preAppB: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'lightblue',
    },

    //grid styles-----------------------------
    grid: {
        borderWidth: 2,
        borderColor: 'black',
        width: "80%",
        aspectRatio: 1,
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    cell: {
        width: '100%',
        height: '100%',
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //pieces (circle) styles--------------------------
    myPieces: {
        flexDirection: 'row',
        marginTop: 80,
        width: "80%",
        aspectRatio: 1.3,
    }, //"grid" container for pieces (hidden)
    rowPieces: {
        flex: 1,
        flexDirection: "column",
    },
    hiddenCell: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, //cells container for pieces (hidden)
    inactiveRow: {
        flex: 1,
        flexDirection: 'row',
    }, //display when player is inactive
    myInactivePieces: {
        marginTop: 80,
        width: "80%",
        aspectRatio: 3,
    }, //display when player is inactive

    //circle sizes and dimensions --------------------
    bigCircle: (bigCircle, color) => ({
        width: bigCircle,
        height: bigCircle,
        marginLeft: -30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 6,
        borderColor: color,
        position: 'absolute',
    }),
    medCircle: (medCircle, color) => ({
        width: medCircle,
        height: medCircle,
        borderRadius: 50,
        marginLeft: -21,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 6,
        borderColor: color,
        position: 'absolute',
    }),
    smallCircle: (smallCircle, color) => ({
        width: smallCircle,
        height: smallCircle,
        borderRadius: 50,
        marginLeft: -5,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: color,
        backgroundColor: color,
        position: 'absolute',
    }),
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
      },
  });