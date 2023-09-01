import React, { createContext, ReactNode, useContext } from 'react';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export enum ToastVarient {
  Default = 'default',
  Twitter = 'twitter',
  Discord = 'discord',
}
export type ExtraOptions = {
  position?: 'top' | 'bottom';
  animation?: 'spring' | 'slideIn';
};

export interface ToastProps {
  isVisible: boolean;
  message: string;
  type: ToastType;
}

type ToastState = {
  isVisible: boolean;
  title: string;
  type: ToastType;
  desc: string;
  variant?: ToastVarient;
  extra?: ExtraOptions;
};

interface ToastContextType {
  toastState: ToastState;
  setToastState: React.Dispatch<React.SetStateAction<ToastState>>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const defaultToastState: ToastState = {
  isVisible: false,
  title: '',
  desc: '',
  variant: ToastVarient.Default,
  type: ToastType.INFO,
  extra: {
    animation: 'slideIn',
    position: 'top',
  },
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastState, setToastState] = React.useState(defaultToastState);

  const contextValue: ToastContextType = {
    toastState,
    setToastState,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastProvider = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      'useToast must be used within a ToastProvider,Maybe you forgoted to wrap your App.js with ToastProvider'
    );
  }
  return context;
};
