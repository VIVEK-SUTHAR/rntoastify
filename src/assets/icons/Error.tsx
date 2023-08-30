import * as React from 'react';
import Svg, { G, Path, SvgProps } from 'react-native-svg';
const ErrorIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" width={24} height={24} {...props}>
    <G stroke="#000" strokeWidth={2}>
      <Path d="m7.952 16.048 8.125-8.125M16.091 16.034 7.91 7.85M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </G>
  </Svg>
);
export default React.memo(ErrorIcon);
