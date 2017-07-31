import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Recommended extends Component {
  static navigationOptions = {
    title: "Recommended"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch, reset, goBack } = navigation;

    return (
      <View>
        <Text>Recommended Movies and Shows</Text>
        <Button title="Back - goBack()" onPress={() => {
          goBack()
        }} />
      </View>
    );
  }
}
