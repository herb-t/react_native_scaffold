import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class DemoScreen6 extends Component {
  static navigationOptions = {
    title: "DemoScreen6"
  };

  render() {
    const
      { navigation } = this.props,
      { navigate, goBack } = navigation;

    return (
      <View>
        <Text>You also mustve come from Demo screen 4!</Text>
        <Button title="Back (Navigation.goBack)" onPress={() => {
          goBack()
        }} />
      </View>
    );
  }
}
