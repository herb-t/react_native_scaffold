import { StyleSheet } from 'react-native';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_TERTIARY,
  BORDER_RADIUS
} from './common';

export default StyleSheet.create({
  buttonLayout: {
    backgroundColor: COLOR_TERTIARY,
    borderWidth: 10,
    borderRadius: 15,
    borderColor: COLOR_TERTIARY,
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR_PRIMARY
  },
  cardLayout: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 350,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: BORDER_RADIUS,
    elevation: 1
  },
  cardLabel: {
    fontSize: 24,
    color: COLOR_SECONDARY,
    textAlign: 'center',
    lineHeight: 48
  },
  appWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60
  }
});
