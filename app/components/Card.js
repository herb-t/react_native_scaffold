'use strict';

// Import React, React Native, React Native Modules and Data.
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  Animated
} from 'react-native';
import '../data.js';

// Define Styles
const styles = StyleSheet.create({
  label: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    marginTop: 25
  }
});

// Create Card class to handles swipe behavior and
// to pass data through.
export default class Card extends Component { 
  constructor(props) {
    // Define state and pass through props.
    super(props);
    this.state = {
      xPosition: new Animated.Value(0),
      yPosition: new Animated.Value(0)
    }

    // Create pan responder to fire animations on
    // swipe left and right.
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx > 100) {
          this.animateCard_(500, 350);
        } else if (gestureState.dx < -100) {
          this.animateCard_(-500, 350);
        }
      }
    });
  }

  animateCard_(x, y) {
    // Animate cards based on coordinates passed.
    Animated.timing(
      this.state.xPosition,
      {
        toValue: x,
        duration: 500,
      }
    ).start();

    Animated.timing(
      this.state.yPosition,
      {
        toValue: y,
        duration: 500,
      }
    ).start();
  }

  render() {
    // Render card with animation styles and data hooked up.
    let { xPosition, yPosition } = this.state;

    return (
      <Animated.View {...this._panResponder.panHandlers} style={{...this.props.style, transform: [{translateX: xPosition}, {translateY: yPosition}]}}>
        <Image source={this.props.src} />
        <Text style={styles.label}>{this.props.name}</Text>
      </Animated.View>
    );
  }
};
