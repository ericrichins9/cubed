import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    //universal
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '90%',
      },
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0093E9',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        // borderColor: 'green',
        // borderWidth: 2,
    },
    input: {
        //height: 70,
        //margin: 12
        //padding: 10,
        textAlign: 'center',
        minWidth: '60%',
        maxHeight: '30%',
        fontSize: 14,
        color: '#333229',
        fontWeight: 'bold'
      },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#fffeec',
        borderColor: '#333229',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        marginTop: 20,
      },
      text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 12
      },
      copiedText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
        marginBottom: 55,
        fontStyle: 'italic'
      },
      buttonText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#333229',
        fontWeight: 'bold',
      },
      createOrJoin: {
        justifyContent: 'space-evenly',
        alignItems: "center",
        flexDirection: 'row',
      },
      tutorial: {
        justifyContent: 'center',
        alignItems: "center",
      },

    rulesText: {
        marginTop: 50,
        marginBottom: 30,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 22,
        maxWidth: '80%',
        textAlign: 'center',
        color: '#FCF6F5FF',
        fontWeight: 'bold'
    },
    screenTitle: {
        //marginTop: 50,
        //marginBottom: 30,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 22,
        textAlign: 'center',
        color: '#FCF6F5FF',
        fontWeight: 'bold'
    },

    //grid styles-----------------------------
    grid: {
        borderWidth: 1.5,
        borderColor: '#FCF6F5FF',
        width: "80%",
        aspectRatio: 1,
        marginTop: 30,
        marginBottom: 30
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    cell: {
        width: '100%',
        height: '100%',
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#FCF6F5FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    waitingCell: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: '#FCF6F5FF',
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
    pulsing: (size, color) => ({
      width: size,
      height: size,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 6,
      borderColor: color,
      backgroundColor: size < 45 ? color : null,
      position: 'absolute',
    }),

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
  });