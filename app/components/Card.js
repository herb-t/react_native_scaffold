'use strict';

// Import React, React Native, React Native Modules and Data.
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  Animated,
  Easing
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
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      rotate: new Animated.Value(0)
    }
  }

  componentWillMount() {
    // Create pan responder to fire animations on
    // swipe left and right.
    const threshold = 120;

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => this.animateAndSetPanValues_(),
      onPanResponderMove: Animated.event([
        // When we drag/pan the object,
        // set the delate to the states pan position.
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: (e, gestureState) => this.gaugeRelease_(gestureState, threshold)
    });
  }

  animateAndSetPanValues_() {
    // Set the initial value to the current state
    this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
    this.state.pan.setValue({x: 0, y: 0});
    Animated.spring(
      this.state.scale,
      { toValue: 1.1, friction: 3 }
    ).start();
    Animated.timing(
      this.state.rotate,
      {
        toValue: 1,
        duration: 500
      }
    ).start();
  }

  animateRelease_(x, y) {
    // Flatten the offset to avoid erratic behavior
    this.state.pan.flattenOffset();
    Animated.spring(
      this.state.scale,
      { toValue: 1, friction: 3 }
    ).start();
    Animated.spring(
      this.state.pan,
      { toValue: {x: x, y: y}, tension: 10 }
    ).start();
    Animated.timing(
      this.state.rotate,
      {
        toValue: 0,
        duration: 500
      }
    ).start();
  }

  gaugeRelease_(pos, threshold) {
    // Gauge release movement threshold and animate accordingly.
    if(pos.dx <= threshold && pos.dx >= -threshold) {
      this.animateRelease_(0, 0);
    } else if (pos.dx > threshold) {
      this.animateRelease_(500, 350);
    } else if (pos.dx < -threshold) {
      this.animateRelease_(-500, 350);
    }
  }

  render() {
    // Render card with animation styles and data hooked up.
    const rotate = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '25deg']
    });
    let { pan, scale} = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    return (
      <Animated.View style={{...this.props.style, ...imageStyle}} {...this._panResponder.panHandlers}>
        <Image source={this.props.src} />
        <Text style={styles.label}>{this.props.name}</Text>
      </Animated.View>
    );
  }
};
