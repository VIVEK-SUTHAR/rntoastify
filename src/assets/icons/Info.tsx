import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const InfoIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" width={24} height={24} {...props}>
    <Path
      stroke="#121923"
      strokeWidth={1.2}
      d="M12.5 16v-1.5m0-5.5v4m8-.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
    />
  </Svg>
);
export default React.memo(InfoIcon);
