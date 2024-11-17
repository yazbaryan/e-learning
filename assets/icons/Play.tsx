import { IconProps } from '../../types';
import Svg, { Path } from 'react-native-svg';

export default function PlayIcon({ color = 'black' }: IconProps) {
    return (
        <Svg width="23" height="26" viewBox="-2 0 21 26" fill="none">
            <Path
                d="M1.75464 1.45853L10.5713 7.12637L19.3879 12.7942L1.75464 24.1299V1.45853Z"
                fill={color}
                stroke={color}
                strokeWidth="2.51904"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
