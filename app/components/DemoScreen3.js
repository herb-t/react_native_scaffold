import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class DemoScreen3 extends Component {
  static navigationOptions = {
    title: "DemoScreen3"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Yet another demo screen to view.</Text>
        <Button title="Navigate" onPress={() => {}} />
      </View>
    );
  }
}
