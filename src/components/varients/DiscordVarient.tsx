import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import type {
  ViewStyle,
  DimensionValue,
  StyleProp,
  ColorValue,
} from 'react-native';
import { STATUSBAR_HEIGHT } from '../../constants';
import { useToastProvider } from '../../context/ToastContext';

export type DiscordToastProps = {
  varient?: 'discord';
  discordToastContainerStyle?: {
    padding?: DimensionValue | undefined;
    margin?: DimensionValue | undefined;
    borderRadius?: number | undefined;
    borderColor?: ColorValue | undefined;
    backgroundColor?: ColorValue | undefined;
  };
};

const DiscordToastVarient = () => {
  const toast = useToastProvider();

  const scaleRef = useRef(new Animated.Value(0)).current;

  const dynamicStyleSheet: StyleProp<ViewStyle> = React.useMemo(() => {
    return {
      display: toast.toastState.isVisible ? 'flex' : 'none',
      flexDirection: 'row',
      transform: [
        {
          scale: scaleRef,
        },
      ],
    };
  }, [scaleRef, toast.toastState.isVisible]);

  const showToast = React.useCallback(() => {
    Animated.spring(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 12,
    }).start();
  }, [scaleRef]);

  useEffect(() => {
    if (toast.toastState.isVisible) {
      showToast();
    } else {
      Animated.spring(scaleRef, {
        toValue: -0,
        useNativeDriver: true,
      }).start();
    }
  }, [scaleRef, showToast, toast.toastState.isVisible]);

  return (
    <Animated.View style={[styles.discordToastContainer, dynamicStyleSheet]}>
      <Text>{toast.toastState.title}</Text>
    </Animated.View>
  );
};

export default React.memo(DiscordToastVarient);
const styles = StyleSheet.create({
  discordToastContainer: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    backgroundColor: '#2a2a2a',
    height: 65,
    borderRadius: 4,
    padding: 8,
    width: Dimensions.get('screen').width - 28,
  },
});
