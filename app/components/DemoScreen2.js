import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class DemoScreen2 extends Component {
  static navigationOptions = {
    title: "DemoScreen2"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Another screen :P</Text>
        <Button title="Navigate" onPress={() => {}} />
      </View>
    );
  }
}
