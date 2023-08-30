import React, { useEffect, useRef } from 'react';
import type {
  ColorValue,
  DimensionValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import SuccessIcon from '../../assets/icons/Success';
import { STATUSBAR_HEIGHT } from '../../constants';
import { useToastProvider } from '../../context/ToastContext';
import ReverseProgressBar, { ReverseProgressBarRef } from '../Progress';

export type DiscordToastProps = {
  varient?: 'discord';
  discordToastContainerStyle?: {
    padding?: DimensionValue | undefined;
    margin?: DimensionValue | undefined;
    borderRadius?: number | undefined;
    borderColor?: ColorValue | undefined;
    backgroundColor?: ColorValue | undefined;
    progressBarColor?: ColorValue | undefined;
  };
};

const DiscordToastVarient = (props: DiscordToastProps) => {
  const { progressBarColor } = props.discordToastContainerStyle || {};
  const toast = useToastProvider();

  const progressRef = React.useRef<ReverseProgressBarRef | null>(null);
  const scaleRef = useRef(new Animated.Value(0)).current;

  const dynamicStyleSheet: StyleProp<ViewStyle> = React.useMemo(() => {
    return {
      display: toast.toastState.isVisible ? 'flex' : 'none',
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
      progressRef.current?.startAnimation();
    } else {
      Animated.spring(scaleRef, {
        toValue: -0,
        useNativeDriver: true,
      }).start();
      progressRef.current?.cancelAnimation();
    }
  }, [scaleRef, showToast, toast.toastState.isVisible]);

  return (
    <Animated.View style={[styles.discordToastContainer, dynamicStyleSheet]}>
      <View style={styles.contentContainer}>
        <View style={styles.iconWrapper}>
          <SuccessIcon height={24} width={24} color="white" strokeWidth={0} />
        </View>
        <View>
          <Text style={styles.textStyle}>{toast.toastState.title}</Text>
          <Text style={styles.textStyle}>{toast.toastState.desc}</Text>
        </View>
      </View>
      <ReverseProgressBar
        ref={progressRef}
        progressBarColor={progressBarColor}
      />
    </Animated.View>
  );
};

export default React.memo(DiscordToastVarient);
const styles = StyleSheet.create({
  discordToastContainer: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT + 10,
    backgroundColor: '#2a2a2a',
    height: 'auto',
    justifyContent: 'space-between',
    borderRadius: 4,
    width: Dimensions.get('screen').width - 28,
  },
  textStyle: {
    padding: 2,
    color: 'white',
    fontSize: 14,
  },
  iconWrapper: { flex: 0.4, justifyContent: 'center', alignItems: 'center' },
  contentContainer: { flexDirection: 'row', padding: 4 },
});
