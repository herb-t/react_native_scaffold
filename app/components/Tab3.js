import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Tab3 extends Component {
  static navigationOptions = {
    title: "Tab3"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch } = navigation;

    return (
      <View>
        <Text>Tab3 text</Text>
        <Button title="Navigate" onPress={() => {}} />
        <Button title="Settings" onPress={() => {
          dispatch(NavigationActions.navigate({routeName: 'Settings'}))
        }} />
      </View>
    );
  }
}
