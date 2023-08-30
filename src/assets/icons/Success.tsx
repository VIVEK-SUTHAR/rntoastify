import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { memo } from 'react';
const Success = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G stroke="#1C274C" strokeLinecap="round" strokeWidth={1.5}>
      <Path strokeLinejoin="round" d="m8.5 12.5 2 2 5-5" />
      <Path d="M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
    </G>
  </Svg>
);
const SuccessIcon = memo(Success);
export default SuccessIcon;
