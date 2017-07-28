import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Tab2 extends Component {
  static navigationOptions = {
    title: "Tab2"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch, reset, goBack } = navigation;

    return (
      <View>
        <Text>Tab2 text</Text>
        <Button title="Navigate" onPress={() => {}} />
        <Button title="Back (Navigation.goBack)" onPress={() => {
          goBack()
        }} />
      </View>
    );
  }
}
