import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Display from './components/Display'
import Buttons from './components/Buttons'
import colors from './constants/Colors';

export default class App extends React.Component {
  state = {
    display: '',
    result: ''
  }

  handleOperation = operation => {
    if (operation === 'C') {
      this.setState({
        display: '',
        result: ''
      })
    }
    else if(operation === '=') {
      this.setState({
        display: this.state.result,
        result: ''
      })
    }
    else {
      const display = this.state.display + operation
      let result = this.state.result
      try {

        let fixedOperation = display.split('×').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')

        result = new String(eval(fixedOperation)).toString()

      }catch(e) {
        //handle error here
      }
      this.setState({
        display,
        result
      })
    }
  }
  render() {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Display state={this.state} />
          <Buttons operation={this.handleOperation} />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: colors.darker,
  },
});

