import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Popular extends Component {
  static navigationOptions = {
    title: "Popular"
  };

  render() {
    const
      { navigation } = this.props,
      { dispatch } = navigation;

    return (
      <View>
        <Text>Popular Movies and Shows</Text>
        <Button title="Do Something" onPress={() => {
          alert("Something has been done")
        }} />
        <Button title="Home" onPress={() => {
          dispatch(NavigationActions.navigate({routeName: 'Home'}))
        }} />
      </View>
    );
  }
}
