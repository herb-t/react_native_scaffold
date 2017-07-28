import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: "Main"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Main Navigation</Text>
        <Button
          title="Navigate (Tab Nav Demo)"
          onPress={() => {navigation.navigate('TabGroupA')}} />
        <Button
          title="Navigate (Settings)"
          onPress={() => {navigation.navigate('Settings')}} />
      </View>
    );
  }
}
