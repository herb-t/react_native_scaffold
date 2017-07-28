import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class DemoScreen4 extends Component {
  static navigationOptions({navigation}) {
    return {
      title: "DemoScreen4",
      headerVisible:
        !(navigation.state.params && navigation.state.params.headless)
    };
  }

  render() {
    const
      { navigation } = this.props,
      { dispatch, navigate, goBack } = navigation;

    return (
      <View>
        <Text>Lets play with state!</Text>
        <Text>But were on demo page 4 if youre counting</Text>
        <Button title="Navigate (Demo Screen 5)" onPress={() => {navigate('DemoScreen5')}} />
        <Button title="Navigate (Demo Screen 6)" onPress={() => {navigate('DemoScreen6')}} />
        <Button title="Back (Navigation.goBack)" onPress={() => {
          goBack()
        }} />
        <Button title="Back" onPress={() => {
          dispatch(NavigationActions.back())
        }} />
      </View>
    );
  }
}
