import React, { createContext, ReactNode, useContext } from 'react';
import { DefaultTimeOut } from '../constants';
import Logger from '../utils/Logger';
import {
  defaultToastState,
  ToastVarient,
  useToastProvider,
} from './ToastContext';
export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface ToastInternalContextType {
  success: (message: string, desc?: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  twitter: (title: string, desc?: string) => void;
  discord: (title: string, desc?: string) => void;
}

const ToastContext = createContext<ToastInternalContextType | undefined>(
  undefined
);

export const ToastProviderInternal: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setToastState, toastState } = useToastProvider();
  const success = (message: string, desc?: string) => {
    Logger.Success('[Internal Context]:[Success Toast]:Message', message);
    if (toastState.isVisible) {
      setToastState({
        isVisible: true,
        title: message,
        desc: desc ? desc : '',
        type: ToastType.SUCCESS,
        varient: ToastVarient.Default,
      });
      return;
    }
    setToastState({
      isVisible: true,
      title: message,
      desc: desc ? desc : '',
      type: ToastType.SUCCESS,
      varient: ToastVarient.Default,
    });
    hideToast();
  };
  const error = (message: string) => {
    if (toastState.isVisible) {
      setToastState({
        isVisible: true,
        title: message,
        desc: '',
        type: ToastType.ERROR,
        varient: ToastVarient.Default,
      });
      return;
    }
    setToastState({
      isVisible: true,
      title: message,
      desc: '',
      type: ToastType.ERROR,
      varient: ToastVarient.Default,
    });
    hideToast();
  };
  const info = (message: string) => {
    if (toastState.isVisible) {
      setToastState({
        isVisible: true,
        title: message,
        desc: '',
        type: ToastType.INFO,
        varient: ToastVarient.Default,
      });
      return;
    }
    setToastState({
      isVisible: true,
      title: message,
      desc: '',
      type: ToastType.INFO,
      varient: ToastVarient.Default,
    });
    hideToast();
  };
  const twitter = (message: string, desc?: string) => {
    const toastConfig = {
      isVisible: true,
      title: message,
      desc: desc ? desc : '',
      type: ToastType.INFO,
      varient: ToastVarient.Twitter,
    };
    if (toastState.isVisible) {
      setToastState(toastConfig);
      return;
    }
    setToastState(toastConfig);
    hideToast();
  };
  const discord = (message: string, desc?: string) => {
    const toastConfig = {
      isVisible: true,
      title: message,
      desc: desc ? desc : '',
      type: ToastType.INFO,
      varient: ToastVarient.Discord,
    };
    if (toastState.isVisible) {
      setToastState(toastConfig);
      return;
    }
    setToastState(toastConfig);
    hideToast();
  };
  const hideToast = React.useCallback(() => {
    setTimeout(() => {
      setToastState(defaultToastState);
    }, DefaultTimeOut);
  }, [setToastState]);

  const contextValue: ToastInternalContextType = {
    error,
    info,
    success,
    twitter,
    discord,
  };
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastInternalContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    Logger.Error(
      '[Internal Context Error]:Possibilly not Wrapped in ToastProvider'
    );
    throw new Error(
      'useToast must be used within a ToastProvider,Maybe you forgoted to wrap your App.{js,ts,jsx,tsx} with ToastProvider'
    );
  }
  return context;
};
