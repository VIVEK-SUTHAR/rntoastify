import type { ReactNode, FC } from 'react';
import React from 'react';

type SwitchProps = {
  children: ReactNode;
};

type CaseProps = {
  condition: boolean;
  children: ReactNode;
};

type DefaultProps = {
  children: ReactNode;
};

const Switch: FC<SwitchProps> = ({ children }) => {
  let matchedChild: ReactNode | null = null;
  let defaultCase: ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (!matchedChild && isCase(child)) {
      const { condition } = child.props;
      const conditionResult = Boolean(condition);
      if (conditionResult) {
        matchedChild = child;
      } else if (!defaultCase && isDefault(child)) {
        defaultCase = child;
      }
    }
  });

  return matchedChild ?? defaultCase ?? null;
};

const Case: React.FC<CaseProps> = ({ children }) => {
  return <>{children}</>;
};

const Default: React.FC<DefaultProps> = ({ children }) => {
  return <>{children}</>;
};

const isCase = (
  child: React.ReactNode
): child is React.ReactElement<CaseProps> => {
  return React.isValidElement(child) && child.type === Case;
};

const isDefault = (
  child: React.ReactNode
): child is React.ReactElement<DefaultProps> => {
  return React.isValidElement(child) && child.type === Default;
};
export { Switch, Case, Default };
