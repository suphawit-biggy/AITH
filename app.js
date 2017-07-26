import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  AsyncStorage,
  Alert,
} from 'react-native';

var styles = require('./styles');
var timeLimit = 60;
var timer = null;

var Rabbit = React.createClass({
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <Text style={styles.rabbit}>{this.props.show ? '🐰': ''}</Text>
            </TouchableHighlight>
        )
    }
})

const STORAGE_KEY = '@highScore:data';

export default class AS4 extends Component {
  constructor() {
      super();
      this.state = {
          highScore: 0,
          timeCount: 0,
          score: 0,
          playing: false,
          holes: [false, false, false,
                  false, false, false,
                  false, false, false]
      }
  }

  componentDidMount() {
        AsyncStorage.getItem(STORAGE_KEY)
            .then((value) => {
                this.setState({
                    highScore: (value == null)? 0:JSON.parse(value),
                })
            })
            .catch((error) => console.log('AsyncStorage: ' + error.message))
            .done();
    }

    _save() {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.highScore))
            .then(() => console.log('Your high score is' + this.state.highScore + ' has been saved'))
            .catch((error) => console.log('AsyncStorage: ' + error.message))
            .done();
    }

  _startGame() {
      this.setState({
          timeCount: timeLimit,
          playing: true,
          score: 0,
      });

      rabbit = setInterval( () => {
          var currentHoles = this.state.holes;
          currentHoles[Math.floor(Math.random() * 9)] = true;
          if(!Math.floor(Math.random() * 3)) {
              currentHoles = [false, false, false,
                              false, false, false,
                              false, false, false]
          }
          this.setState({
            holes: currentHoles,
      }) 
      }, 500);  
      

      timer = setInterval(() => {
          this.setState({
              timeCount: this.state.timeCount - 1,
          });
          if(this.state.timeCount == 0) {
              this._stopGame();
          }
      }, 1000);
  }

  _stopGame() {
      clearInterval(timer);
      clearInterval(rabbit);
      this.setState({
          playing: false,
          holes: [false, false, false,
                  false, false, false,
                  false, false, false],
          highScore: (this.state.score > this.state.highScore) ? this.state.score: this.state.highScore,
      })
       (this.state.score > this.state.highScore) ? Alert.alert('New high score: ' + this.state.score): null
  }

  _handleTouch(holeNumber) {
      if(this.state.holes[holeNumber]) {
          this.setState({
              holes: this.state.holes[holeNumber] ? this.state.score: false,
              score: this.state.score + 1,
          })
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scoreRow}>
            <View style={styles.highScore}>
             <Text style={styles.label}>High Score</Text>
             <Text style={styles.text}>{this.state.highScore}</Text>
            </View>
            <View style={styles.timeCount}>
                <Text style={styles.label}>Time</Text>
                <Text style={styles.text}>{this.state.timeCount}</Text>
            </View>
            <View style={styles.currentScore}>
                <Text style={styles.label}>Score</Text>
                <Text style={styles.text}>{this.state.score}</Text>
            </View>
        </View>
        <View style={styles.holesRow}>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[0]} onPress={this._handleTouch(0)}/>
            </View>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[1]} onPress={this._handleTouch(1)}/>
            </View>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[2]} onPress={this._handleTouch(2)}/>
            </View>
        </View>
        <View style={styles.holesRow}>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[3]} onPress={this._handleTouch(3)}/>
            </View>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[4]} onPress={this._handleTouch(4)}/>
            </View>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[5]} onPress={this._handleTouch(5)}/>
            </View>
        </View>
        <View style={styles.holesRow}>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[6]} onPress={this._handleTouch(6)}/>
            </View>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[7]} onPress={this._handleTouch(7)}/>
            </View>
            <View style={styles.hole}>
                <Rabbit show={this.state.holes[8]} onPress={this._handleTouch(8)}/>
            </View>
        </View>
        <View style={styles.buttonRow}>
            <Button
                title="Start Game"
                color="#7c00ff"
                onPress={this._startGame.bind(this)}
                disabled={this.state.playing}
                />
        </View>
      </View>
    );
  }
}

module.exports = AS4;
