import React, { Component } from 'react';
import { Text } from 'react-native';

export default class DemoScreen1 extends Component {
  static navigationOptions = {
    title: "DemoScreen1"
  };

  render() {
    return (
      <Text>A demo screen/view text</Text>
    );
  }
}
