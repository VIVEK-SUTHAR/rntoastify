import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';

export const DefaultTimeOut = 3000;

export const STATUSBAR_HEIGHT = StatusBar?.currentHeight || 10;
export const DEVICE_WIDTH = Dimensions.get('screen').width;
