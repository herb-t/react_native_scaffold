import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Card from './Card.js';
import '../data.js';

// Define Styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60
  },
});

export default class Home extends Component {
  static navigationOptions = {
    title: "Swipe If You Like"
  };

  constructor(props) {
    // Add shows to data
    super(props);
    this.state = {
      shows: Data.shows
    };
  }

  render() {
    const showCards = this.state.shows.map((data) =>
      <Card
        key={data.id}
        name={data.name}
        src={data.src}
        style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: 350, height: 350, backgroundColor: '#eee'}}
      />
    );
    const { navigation } = this.props;
    const { dispatch } = navigation;

    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapper}>{showCards}</View>
        <View style={styles.button}>
          <Button title="View Selected" onPress={() => {navigation.navigate('Main')}} />
        </View>
      </View>
    );
  }
}
