import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { ColorValue } from 'react-native';
import { Animated, StyleSheet, View } from 'react-native';

type ReverseProgressBarProps = {
  progressBarColor?: ColorValue;
};

export type ReverseProgressBarRef = {
  startAnimation: () => void;
  cancelAnimation: () => void;
};
const DEFAULT_PROGRESSBAR_COLOR = '#7289da';
const ReverseProgressBar = forwardRef<
  ReverseProgressBarRef,
  ReverseProgressBarProps
>((props, ref) => {
  const { progressBarColor = DEFAULT_PROGRESSBAR_COLOR } = props;
  const barWidth = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);
  const progressPercent = barWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '0%'],
  });
  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      resetAnimation();
      animateProgress();
    },
    cancelAnimation: () => {
      if (animation.current) {
        animation.current.stop();
      }
    },
  }));
  const resetAnimation = () => {
    barWidth.setValue(0);
    if (animation.current) {
      animation.current.stop();
    }
  };

  const animateProgress = () => {
    animation.current = Animated.timing(barWidth, {
      duration: 3000,
      toValue: 100,
      useNativeDriver: false,
    });
    animation.current.start();
  };
  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          { width: progressPercent, backgroundColor: progressBarColor },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 6,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressBar: {
    height: '100%',
    borderBottomLeftRadius: 4,
  },
});

export default ReverseProgressBar;
