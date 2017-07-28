import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Home extends Component {
  static navigationOptions = {
    title: "Home Screen"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch } = navigation;

    return (
      <View>
        <Text>Welcome Home</Text>
        <Button title="Goto (Main)" onPress={() => {navigation.navigate('Main')}} />
        <Button title="Settings" onPress={() => {
          dispatch(NavigationActions.navigate({
            routeName: 'Settings',
            params: {headless: true, title: "Settings!"}
          }))
        }} />
      </View>
    );
  }
}
