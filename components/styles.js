import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    //universal
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '90%',
      },
    safeArea: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      },
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0093E9',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameSettingsContainer: {
      alignItems: 'center', 
      justifyContent: 'space-between', 
      flexDirection: 'row'
    },
    input: {
        textAlign: 'center',
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
        marginBottom: 40,
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
    buttonText: {
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#333229',
      fontWeight: 'bold',
      },
    rulesText: {
        marginTop: 10,
        fontSize: 22,
        maxWidth: '80%',
        textAlign: 'center',
        color: '#FCF6F5FF',
        fontWeight: 'bold'
    },
    screenTitle: {
        // marginLeft: 10,
        // marginRight: 10,
        fontSize: 22,
        textAlign: 'center',
        color: '#FCF6F5FF',
        fontWeight: 'bold'
    },

    //grid styles-----------------------------
    grid: {
        alignItems: 'center',
        borderWidth: 1.4,
        borderColor: '#FCF6F5FF',
        width: "90%",
        marginTop: 12,
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
        width: "100%",
        aspectRatio: 1.3,
        // borderWidth: 1,
        // borderColor: 'white'
    }, //"grid" container for pieces (hidden)

    hiddenCell: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'white'
    }, //cells container for pieces (hidden)

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