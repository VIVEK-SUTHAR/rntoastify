import React, { useEffect, useRef } from 'react';
import type {
  ColorValue,
  DimensionValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Animated, StyleSheet, Text, View } from 'react-native';
import ErrorIcon from '../assets/icons/Error';
import Info from '../assets/icons/Info';
import SuccessIcon from '../assets/icons/Success';
import { STATUSBAR_HEIGHT } from '../constants';
import { ToastType, useToastProvider } from '../context/ToastContext';
import Logger from '../utils/Logger';
import { Case, Switch } from './ConditionalUI';
import { ToastVarient } from '../context/ToastContext';
import DiscordVarient, {
  type DiscordToastProps,
} from './varients/DiscordVarient';
import TwitterVarient, {
  type TwiterToastProps,
} from './varients/TwitterVarient';

const COLORS = {
  ERROR: '#FF0000',
  SUCCESS: '#00FF00',
  INFO: '#FF5733',
  DEFAULT: '#1d1d1d',
};
const TOAST_POSITIONS = {
  top: { top: 10 + STATUSBAR_HEIGHT },
  bottom: { bottom: 45 },
};

export type ToastConfig = {
  config: {
    timeOut: number;
    errorColor: ColorValue;
    successColor: ColorValue;
    infoColor: ColorValue;
    position: 'top' | 'bottom';
    animationType: 'slideIn' | 'spring';
    progressBarColor?: ColorValue | undefined;
    icon?: {
      show?: boolean;
    } & IconProps;
  };
};
type IconProps = {
  height?: number;
  width?: number;
  color?: ColorValue;
  successIcon?: JSX.Element;
  errorIcon?: JSX.Element;
  infoIcon?: JSX.Element;
};
type DefaultToastProps = {
  varient?: 'default';
  toastStyleConfig?: {
    padding?: DimensionValue | undefined;
    margin?: DimensionValue | undefined;
    borderRadius?: number | undefined;
    borderColor?: ColorValue | undefined;
    borderWidth?: number | undefined;
    width?: DimensionValue | undefined;
  };
};

export type ToastProps = {
  config?: Partial<ToastConfig['config']>;
} & (TwiterToastProps | DiscordToastProps | DefaultToastProps);

const Toast: React.FC<ToastProps> = (props) => {
  const {
    errorColor = COLORS.ERROR,
    successColor = COLORS.SUCCESS,
    infoColor = COLORS.INFO,
    position = 'top',
    animationType = 'slideIn',
    icon = { show: false, color: 'black', height: 18, width: 18 },
  } = props.config || {};
  const toast = useToastProvider();

  const _ToastVarient = React.useMemo(
    () => toast.toastState.variant,
    [toast.toastState.variant]
  );

  const toastOffSet = React.useMemo(
    () => (position === 'bottom' ? 450 : -100),
    [position]
  );
  Logger.Warn(`TOast Offset FOR ${position} is ${toastOffSet}`);

  const slideIn = useRef(new Animated.Value(toastOffSet)).current;
  const scaleRef = useRef(new Animated.Value(0.1)).current;

  const backgroundMap = {
    [ToastType.ERROR]: errorColor,
    [ToastType.SUCCESS]: successColor,
    [ToastType.INFO]: infoColor,
    default: COLORS.DEFAULT,
  };
  const getToastBackGroundColor =
    backgroundMap[toast.toastState.type] || COLORS.DEFAULT;

  const showToast = React.useCallback(() => {
    if (animationType === 'spring') {
      const scaleAnim = Animated.spring(scaleRef, {
        toValue: 1,
        useNativeDriver: true,
        damping: 14,
      });
      const slideInAnim = Animated.spring(slideIn, {
        toValue: position === 'bottom' ? 25 : 10,
        useNativeDriver: true,
        damping: 10,
      });
      Animated.parallel([slideInAnim, scaleAnim]).start();
      return;
    }
    const slideInAnim = Animated.timing(slideIn, {
      toValue: position === 'bottom' ? 25 : 10,
      useNativeDriver: true,
    });
    slideInAnim.start();
  }, [animationType, position, scaleRef, slideIn]);

  const hideToast = React.useCallback(() => {
    if (animationType === 'spring') {
      const hideScale = Animated.spring(scaleRef, {
        toValue: 0.1,
        useNativeDriver: true,
        damping: 10,
      });
      const hideViaSlide = Animated.spring(slideIn, {
        toValue: toastOffSet,
        useNativeDriver: true,
        damping: 10,
      });
      Animated.parallel([hideScale, hideViaSlide]).start();
      return;
    }
    const hideViaSlide = Animated.timing(slideIn, {
      toValue: toastOffSet,
      useNativeDriver: true,
    });
    hideViaSlide.start();
  }, [animationType, scaleRef, slideIn, toastOffSet]);

  useEffect(() => {
    Logger.Log('Toast State', toast.toastState);
    if (toast.toastState.isVisible) {
      showToast();
    } else {
      hideToast();
    }
  }, [hideToast, showToast, slideIn, toast.toastState, toast.setToastState]);

  const dynamicStyleSheet: StyleProp<ViewStyle> = React.useMemo(() => {
    return {
      backgroundColor: getToastBackGroundColor,
      display: toast.toastState.isVisible ? 'flex' : 'none',
      transform: [
        {
          translateY: slideIn,
        },
        {
          scale: animationType === 'slideIn' ? 1 : scaleRef,
        },
      ],
    };
  }, [
    animationType,
    getToastBackGroundColor,
    scaleRef,
    slideIn,
    toast.toastState.isVisible,
  ]);

  const style = {
    ...styles.toastContainer,
    ...dynamicStyleSheet,
    ...(props.varient === 'default' && props.toastStyleConfig),
  };

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
    <Switch>
      <Case condition={_ToastVarient === ToastVarient.Default}>
        <Animated.View style={[style, TOAST_POSITIONS[position]]}>
          {icon.show && (
            <View style={styles.iconWrapper}>{getToastIcon()}</View>
          )}
          <Text>{toast.toastState.title}</Text>
        </Animated.View>
      </Case>
      <Case condition={_ToastVarient === ToastVarient.Twitter}>
        <TwitterVarient {...props} />
      </Case>
      <Case condition={_ToastVarient === ToastVarient.Discord}>
        <DiscordVarient {...props} />
      </Case>
    </Switch>
  );
};

export default React.memo(Toast);

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    height: 'auto',
    padding: 8,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  iconWrapper: {
    width: 'auto',
    marginHorizontal: 4,
  },
});
