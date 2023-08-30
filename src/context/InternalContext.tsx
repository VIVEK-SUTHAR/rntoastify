import React, { createContext, ReactNode, useContext } from 'react';
import { DefaultTimeOut } from '../constants';
import Logger from '../utils/Logger';
import { useToastProvider } from './ToastContext';
export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface ToastInternalContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastInternalContextType | undefined>(
  undefined
);

export const ToastProviderInternal: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setToastState, toastState } = useToastProvider();
  const success = (message: string) => {
    Logger.Success('[Internal Context]:[Success Toast]:Message', message);
    setToastState({
      desc: '',
      isVisible: true,
      title: 'dsd',
      type: ToastType.ERROR,
    });
    if (toastState.isVisible) {
      setToastState({
        isVisible: true,
        title: message,
        desc: '',
        type: ToastType.SUCCESS,
      });
      return;
    }
    setToastState({
      isVisible: true,
      title: message,
      desc: '',
      type: ToastType.SUCCESS,
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
      });
      return;
    }
    setToastState({
      isVisible: true,
      title: message,
      desc: '',
      type: ToastType.ERROR,
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
      });
      return;
    }
    setToastState({
      isVisible: true,
      title: message,
      desc: '',
      type: ToastType.INFO,
    });
    hideToast();
  };

  const hideToast = React.useCallback(() => {
    setTimeout(() => {
      setToastState({
        isVisible: false,
        title: '',
        desc: '',
        type: ToastType.INFO,
      });
    }, DefaultTimeOut);
  }, [setToastState]);
  const contextValue: ToastInternalContextType = {
    error,
    info,
    success,
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
