import React, { createContext, ReactNode, useContext } from 'react';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface ToastProps {
  isVisible: boolean;
  message: string;
  type: ToastType;
}

type ToastState = {
  isVisible: boolean;
  title: string;
  type: ToastType;
  desc?: string;
};
interface ToastContextType {
  toastState: ToastState;
  setToastState: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      title: string;
      desc: string;
      type: ToastType;
    }>
  >;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastState, setToastState] = React.useState({
    isVisible: false,
    title: '',
    desc: '',
    type: ToastType.INFO,
  });

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
