'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import button from '../styles/button.js';

export default class CustomButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TouchableHighlight underlayColor="rgba(255, 255, 255, 0)" activeOpacity={0.7} onPress={() => {this.props.onPress()}}>
        <View style={button.layout}>
          <Text style={button.text}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};
