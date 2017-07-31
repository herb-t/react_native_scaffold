import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class New extends Component {
  static navigationOptions = {
    title: "New"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch, goBack } = navigation;

    return (
      <View>
        <Text>New Movies and Shows</Text>
        <Button title="Back" onPress={() => {
          dispatch(NavigationActions.back())
        }} />
        <Button title="Back to Recommendations (Home)" onPress={() => {
          dispatch(NavigationActions.navigate({routeName: 'Home'}))
        }} />
        <Button title="Back to Home(state reset)" onPress={() => {
          dispatch(NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'Home'})
            ]
          }))
        }} />
      </View>
    );
  }
}
