'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import styles from '../styles/styles.js';

export default class CustomButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TouchableHighlight underlayColor="rgba(255, 255, 255, 0)" activeOpacity={0.7} onPress={() => {this.props.onPress()}}>
        <View style={styles.buttonLayout}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
};
