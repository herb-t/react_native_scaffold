'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  PanResponder,
  Animated,
  Easing
} from 'react-native';
import styles from '../styles/styles.js';

/**
 * Card Class to pass data through and handle swipe gestures and animations.
 * @class
 */
export default class Card extends Component {

  /**
   * Define state and pass through props.
   * @param  {!Object} props Props object to pass data through.
   * @struct
   */
  constructor(props) {
    // Pass through props.
    super(props);

    // Define state with animated values and window dimension defaults.
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      rotate: new Animated.Value(0.5),
      width: 0,
      height: 0
    }
  }

  /**
   * Once the component is mounted, set up panResponder to
   * track the current coordinates for touch.
   * @public
   */
  componentWillMount() {
    // Define height and width of window.
    // Assign xThresh, yThresh, width and height values.
    let { height, width } = Dimensions.get('window');
    this.setState({width: width, height: height});

    // Create pan responder to fire animations on
    // swipe left and right.
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => this.animateResponse_(),
      onPanResponderMove: (e, gestureState) => {
        // When we drag/pan the object,
        // set the delate to the states pan position.
        Animated.event([null,
          {dx: this.state.pan.x, dy: this.state.pan.y}
        ])(e, gestureState);

        // Fire rotation animations according to position of swipe.
        this.gaugeThreshold_(gestureState, 'rotate');
      },
      onPanResponderRelease: (e, gestureState) => this.gaugeThreshold_(gestureState, 'release')
    });
  }

  /**
   * Fire animation for rotating the card.
   * @param  {!Number} val Corresponding number value for animation.
   * @private
   */
  animateRotation_(val) {
    Animated.timing(
      this.state.rotate,
      { toValue: val, easing: Easing.elastic(2), duration: 170 }
    ).start();
  }

  /**
   * Animate initial default values and set up
   * scale animation for pan movement.
   * @private
   */
  animateResponse_() {
    // Set the initial value to the current state
    // and animate the card scale animation.
    this.state.pan.setOffset({
      x: this.state.pan.x._value,
      y: this.state.pan.y._value
    });

    this.state.pan.setValue({x: 0,y: 0});

    Animated.spring(
      this.state.scale,
      { toValue: 1.1, friction: 3 }
    ).start();
  }

  /**
   * Fire animation according to x and y parameters given.
   * @param  {!Number} x X position to animate to.
   * @param  {!number} y Y position to animate to.
   * @private
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
   * Fire release and rotate animations according to logic.
   * @param  {!Number} pos Current position of pan.
   * @param {!String} label Label given to fire correct animation.
   * @private
   */
  gaugeThreshold_(pos, label) {
    // Destructure width and height properties.
    const { width, height } = this.state;

    // Define comparison parameters.
    let xThresh = width / 4;
    let yThresh = height / 2;
    let { dx, y0 } = pos;

    // Gauge release values to animate dependent upon
    // the current x position and first y touchpoint.
    if(dx > xThresh && y0 < yThresh) {
      label === 'release' ? this.animateRelease_(width, yThresh) :
      this.animateRotation_(1);
    } else if(dx > xThresh && y0 >= yThresh) {
      label === 'release' ? this.animateRelease_(width, -yThresh) :
      this.animateRotation_(0);
    } else if (dx < -xThresh && y0 < yThresh) {
      label === 'release' ? this.animateRelease_(-width, yThresh) :
      this.animateRotation_(0);
    } else if (dx < -xThresh && y0 >= yThresh) {
      label === 'release' ? this.animateRelease_(-width, -yThresh) :
      this.animateRotation_(1);
    } else {
      label === 'release' ? this.animateRelease_(0, 0) :
      this.animateRotation_(0.5);
    }
  }

  /**
   * Render card component with animation and styles given.
   * @public
   */
  render() {
    // Define pan, scale and transform styles.
    let { pan, scale } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    // Use interpolation function to switch degree of rotation
    // based on the inputRange defined.
    const rotate = this.state.rotate.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['-22deg', '0deg', '22deg'],
      extrapolate: 'clamp'
    });

    // Define final styles object to pass into card.
    let cardStyle = {
      transform: [{translateX}, {translateY}, {rotate}, {scale}]
    };

    return (
      // Render swipe and animation supported card component.
      <Animated.View style={[styles.cardLayout, {...cardStyle}]} {...this._panResponder.panHandlers}>
        <Image source={this.props.src} />
        <Text style={styles.cardLabel}>{this.props.name}</Text>
      </Animated.View>
    );
  }
};
