import React, { useEffect, useRef } from 'react';
import type {
  ColorValue,
  DimensionValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import ErrorIcon from '../../assets/icons/Error';
import InfoIcon from '../../assets/icons/Info';
import SuccessIcon from '../../assets/icons/Success';
import { STATUSBAR_HEIGHT } from '../../constants';
import { ToastType, useToastProvider } from '../../context/ToastContext';
import ReverseProgressBar, { ReverseProgressBarRef } from '../Progress';
import { ToastProps } from '../Toast';

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

const DiscordToastVarient = (props: ToastProps) => {
  const { progressBarColor, icon } = props.config || {};
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
  function getToastIcon() {
    if (!icon?.show) return null;
    switch (toast.toastState.type) {
      case ToastType.SUCCESS:
        return icon?.successIcon ?? <SuccessIcon />;
      case ToastType.ERROR:
        return icon?.errorIcon ?? <ErrorIcon />;

      case ToastType.INFO:
        return icon?.infoIcon ?? <InfoIcon color={'white'} />;
      default:
        return <InfoIcon color={'white'} />;
    }
  }

  return (
    <Animated.View style={[styles.discordToastContainer, dynamicStyleSheet]}>
      <View style={styles.contentContainer}>
        <View style={styles.iconWrapper}>{getToastIcon()}</View>
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
    backgroundColor: '#36393e',
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
