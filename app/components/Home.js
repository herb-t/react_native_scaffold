import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Home extends Component {
  static navigationOptions = {
    title: "Recommendations"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch } = navigation;

    return (
      <View>
        <Text>Recommended For You</Text>

        <Button title="View Selected" onPress={() => {navigation.navigate('Main')}} />

      </View>
    );
  }
}
