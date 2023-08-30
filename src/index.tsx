import { ToastProvider as ToastContext } from './context/ToastContext';
import Toast from './components/Toast';
import { ToastProviderInternal, useToast } from './context/InternalContext';
import React, { PropsWithChildren } from 'react';

const ToastProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ToastContext>
      <ToastProviderInternal>{children}</ToastProviderInternal>
    </ToastContext>
  );
};
export { Toast, ToastProvider, useToast };
