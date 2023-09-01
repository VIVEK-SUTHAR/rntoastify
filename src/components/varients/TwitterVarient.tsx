import React, { useEffect, useRef } from 'react';
import type {
  ColorValue,
  DimensionValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { DEVICE_WIDTH, STATUSBAR_HEIGHT } from '../../constants';
import { ToastType, useToastProvider } from '../../context/ToastContext';
import ErrorIcon from '../../assets/icons/Error';
import Info from '../../assets/icons/Info';
import SuccessIcon from '../../assets/icons/Success';
import { ToastProps } from '../Toast';
export type TwiterToastProps = {
  varient?: 'twitter';
  twitterToastContainerStyle?: {
    padding?: DimensionValue | undefined;
    margin?: DimensionValue | undefined;
    borderRadius?: number | undefined;
    borderColor?: ColorValue | undefined;
    borderWidth?: number | undefined;
  };
};
const TwitterToastVarient = (props: ToastProps) => {
  const { icon } = props.config || {};
  const toast = useToastProvider();
  const slideIn = useRef(new Animated.Value(-150)).current;

  const showToast = React.useCallback(() => {
    Animated.timing(slideIn, {
      toValue: 0,
      useNativeDriver: true,
      duration: 600,
    }).start();
  }, [slideIn]);

  useEffect(() => {
    if (toast.toastState.isVisible) {
      showToast();
    } else {
      Animated.timing(slideIn, {
        toValue: -150,
        useNativeDriver: true,
        duration: 150,
      }).start();
    }
  }, [showToast, slideIn, toast.toastState.isVisible]);

  const dynamicStyleSheet: StyleProp<ViewStyle> = React.useMemo(() => {
    return {
      display: toast.toastState.isVisible ? 'flex' : 'none',
      flexDirection: 'row',
      transform: [
        {
          translateY: slideIn,
        },
      ],
    };
  }, [slideIn, toast.toastState.isVisible]);
  function getToastIcon() {
    if (!icon?.show) return null;
    switch (toast.toastState.type) {
      case ToastType.SUCCESS:
        return icon?.successIcon ?? <SuccessIcon />;
      case ToastType.ERROR:
        return icon?.errorIcon ?? <ErrorIcon />;

      case ToastType.INFO:
        return icon?.infoIcon ?? <Info />;
      default:
        return <Info />;
    }
  }
  return (
    <Animated.View style={[styles.twitterToastContainer, dynamicStyleSheet]}>
      <View style={styles.twitterToastIcon}>
        <Text style={styles.toastIconSize}>{getToastIcon()}</Text>
      </View>
      <View style={styles.flex1}>
        <Text style={styles.twitterToastTitle}>{toast.toastState.title}</Text>
        <Text style={styles.twitterToastSubTitle}>{toast.toastState.desc}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  twitterToastContainer: {
    backgroundColor: 'rgba(29,161,242,0.1)',
    borderColor: 'rgba(29,161,242,1)',
    borderWidth: 1,
    position: 'absolute',
    top: STATUSBAR_HEIGHT + 10,
    padding: 4,
    height: 65,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH - 20,
  },
  twitterToastIcon: {
    flex: 0.15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toastIconSize: {
    fontSize: 22,
  },
  twitterToastTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  twitterToastSubTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  flex1: {
    flex: 1,
  },
});
export default React.memo(TwitterToastVarient);
