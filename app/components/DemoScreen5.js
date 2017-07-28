import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class DemoScreen5 extends Component {
  static navigationOptions = {
    title: "DemoScreen5"
  };

  render() {
    const
      { navigation } = this.props,
      { navigate, goBack } = navigation;

    return (
      <View>
        <Text>Did you just come from demo screen 4?</Text>
        <Button title="Back (Navigation.goBack)" onPress={() => {
          goBack()
        }} />
      </View>
    );
  }
}
