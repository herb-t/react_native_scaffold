import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Card from './Card.js';
import '../data.js';

/**
 * Stylesheet for label on cards.
 */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60
  },
});

/**
 * Wrapper class to handle card component and display cards from data.
 */
export default class Home extends Component {

  /**
   * Navigation Title
   * @type {Object}
   */
  static navigationOptions = {
    title: "Swipe If You Like"
  };

  /**
   * Define state and pass through props.
   * @param  {!Object} props Props object to pass data through.
   * @struct
   */
  constructor(props) {
    // Add shows to data
    super(props);
    this.state = {
      shows: Data.shows
    };
  }

  /**
   * Render navigation and cards for app.
   */
  render() {
    // Create cards variable that maps through all card data to create cards.
    const showCards = this.state.shows.map((data) =>
      <Card
        key={data.id}
        name={data.name}
        src={data.src}
        style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: 350, height: 350, backgroundColor: '#efefef'}}
      />
    );

    // Assign naviation and dispatch.
    const { navigation } = this.props;
    const { dispatch } = navigation;

    // Create wrapper view containing cards and navigation.
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
