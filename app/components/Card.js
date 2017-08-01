'use strict';

// Import React, React Native, React Native Modules.
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

/**
 * Stylesheet for label on cards.
 */
const styles = StyleSheet.create({
  label: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    marginTop: 25
  }
});

/**
 * Card Class to pass data through and handle swipe gestures and animations.
 */
export default class Card extends Component {

  /**
   * Define state and pass through props.
   * @param  {!Object} props Props object to pass data through.
   * @struct
   */
  constructor(props) {
    // Define state and pass in props for component.
    // State includes animated pan, scale and rotate values as
    // well as a threshold value.
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      rotate: new Animated.Value(0.5),
      threshold: 120
    }
  }

  /**
   * Once the component is mounted, set up panResponder to
   * track the current coordinates for touch.
   */
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

  /**
   * Animate initial default values and set up
   * scale animation for pan movement.
   */
  animateAndSetPanValues_() {
    // Set the initial value to the current state
    // and animate the card scale animation.
    this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
    this.state.pan.setValue({x: 0, y: 0});
    Animated.spring(
      this.state.scale,
      { toValue: 1.1, friction: 3 }
    ).start();
  }

  /**
   * Fire animation according to x and y parameters given.
   * @param  {!Number} x X position to animate to.
   * @param  {!number} y Y position to animate to.
   */
  animateRelease_(x, y) {
    // Flatten the offset to avoid erratic behavior.
    this.state.pan.flattenOffset();

    // Fire spring animations for the scale and pan.
    Animated.spring(
      this.state.scale,
      { toValue: 1, friction: 3 }
    ).start();
    Animated.spring(
      this.state.pan,
      { toValue: {x: x, y: y}, tension: 15 }
    ).start();
  }

  /**
   * Fire release animations according to logic.
   * @param  {!Number} pos Current position of pan.
   */
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

  /**
   * Render card component with animation and styles given.
   */
  render() {
    // Define pan, scale and transform styles.
    let { pan, scale } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    // Define rotate values to switch dependent upon
    // the curren pan.x position.
    const rotate = this.state.pan.x.interpolate({
      inputRange: [-this.state.threshold, 0, this.state.threshold],
      outputRange: ['-25deg', '0deg', '25deg']
    });

    // Define styles for card to pass in.
    let cardStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

    return (
      <Animated.View style={{...this.props.style, ...cardStyle}} {...this._panResponder.panHandlers}>
        <Image source={this.props.src} />
        <Text style={styles.label}>{this.props.name}</Text>
      </Animated.View>
    );
  }
};
