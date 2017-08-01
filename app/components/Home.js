import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Card from './Card.js';
import CustomButton from './CustomButton.js';
import layout from '../styles/layout.js';
import card from '../styles/card.js';
import '../data.js';

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
      <View style={layout.wrapper}>
        <View style={layout.wrapper}>{showCards}</View>
        <View>
          <CustomButton text="View Selected" onPress={() => {navigation.navigate('Main')}} />
        </View>
      </View>
    );
  }
}
