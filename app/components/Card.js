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
      rotate: new Animated.Value(0.5),
      threshold: 120
    }
  }

  componentWillMount() {
    // Create pan responder to fire animations on
    // swipe left and right.
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => this.animateAndSetPanValues_(),
      onPanResponderMove: Animated.event([
        // When we drag/pan the object,
        // set the delate to the states pan position.
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: (e, gestureState) => this.gaugeRelease_(gestureState)
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
      { toValue: {x: x, y: y}, tension: 15 }
    ).start();
  }

  gaugeRelease_(pos) {
    // Gauge release movement threshold and animate accordingly.
    if(pos.dx <= this.state.threshold && pos.dx >= -this.state.threshold) {
      this.animateRelease_(0, 0);
    } else if (pos.dx > this.state.threshold) {
      this.animateRelease_(500, 350);
    } else if (pos.dx < -this.state.threshold) {
      this.animateRelease_(-500, 350);
    }
  }

  render() {
    // Render card with animation styles and data hooked up.
    let { pan, scale } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    const rotate = this.state.pan.x.interpolate({
      inputRange: [-this.state.threshold, 0, this.state.threshold],
      outputRange: ['-25deg', '0deg', '25deg']
    });

    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    return (
      <Animated.View style={{...this.props.style, ...imageStyle}} {...this._panResponder.panHandlers}>
        <Image source={this.props.src} />
        <Text style={styles.label}>{this.props.name}</Text>
      </Animated.View>
    );
  }
};
