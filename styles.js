var React = require('react-native');
var {StyleSheet} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  scoreRow: {
      flex: 1,
      backgroundColor: '#1B5E20',
      flexDirection: 'row',
  },
  highScore: {
      flex: 2,
      backgroundColor: '#EC407A',
      alignItems: 'center',
      borderRadius: 10,
      margin: 10,
  },
  timeCount: {
      flex: 1,
      backgroundColor: '#26C6DA',
      alignItems: 'center',
      borderRadius: 10,
      margin: 10,
  },
  label: {
      fontSize: 13,
      color: 'white',
  },
  text: {
      fontSize: 20,
      color: 'white',
  },
  currentScore: {
      flex: 2,
      backgroundColor: '#EF5350',
      alignItems: 'center',
      borderRadius: 10,
      margin: 10,
  },
  holesRow: {
      backgroundColor: '#388E3C',
      flex: 2,
      flexDirection: 'row',
  },
  hole: {
      flex: 1,
      backgroundColor: '#66BB6A',
      margin: 7,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
  },
  touch: {
      backgroundColor: 'white',
  },
  rabbit: {
      fontSize: 50,
  },
  buttonRow: {
      paddingTop: 10,
      flex: 1,
  },    
});