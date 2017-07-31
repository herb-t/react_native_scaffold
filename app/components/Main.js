import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: "Selected Recommendations"
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Recent Recommendations</Text>
        <Text>Game of Thrones</Text>
        <Text>The Walking Dead</Text>
        <Button
          title="View By Category"
          onPress={() => {navigation.navigate('Selections')}} />
      </View>
    );
  }
}
