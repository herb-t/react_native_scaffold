import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Tab1 extends Component {
  static navigationOptions = {
    title: "Tab 1"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch, goBack } = navigation;

    return (
      <View>
        <Text>Tab One - first tab</Text>
        <Button title="Back (Navigation.goBack)" onPress={() => {
          goBack()
        }} />
        <Button title="Back" onPress={() => {
          dispatch(NavigationActions.back())
        }} />
        <Button title="Back to Home Screen (no state manipulated.)" onPress={() => {
          dispatch(NavigationActions.navigate({routeName: 'Home'}))
        }} />
        <Button title="Back to Home Screen (state reset)" onPress={() => {
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Home'})
            ]
          }))
        }} />
        <Button title="Inject: Home>TabGroupA>Home>Main>TabGroupA" onPress={() => {
          dispatch(NavigationActions.reset({
            index: 4,
            actions: [
              NavigationActions.navigate({routeName: 'Home'}),
              NavigationActions.navigate({routeName: 'TabGroupA'}),
              NavigationActions.navigate({routeName: 'Home'}),
              NavigationActions.navigate({routeName: 'Main'}),
              NavigationActions.navigate({routeName: 'TabGroupA'})
            ]
          }))
        }} />
      </View>
    );
  }
}
