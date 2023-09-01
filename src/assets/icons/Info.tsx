import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const InfoIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={20} height={20} {...props}>
    <Path
      fill={props.color || 'white'}
      fillRule="evenodd"
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10 5.75a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75ZM12 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default React.memo(InfoIcon);
