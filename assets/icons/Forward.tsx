import { IconProps } from '../../types';
import Svg, { Path } from 'react-native-svg';

export default function ForwardIcon({ color = 'black' }: IconProps) {
    return (
        <Svg width="21" height="22" viewBox="0 0 21 22" fill="none">
            <Path
                d="M11.3028 16.8416L19.0785 10.7938L11.3028 4.74603V16.8416Z"
                fill={color}
                stroke={color}
                strokeWidth="1.72793"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M1.79916 16.8416L9.57485 10.7938L1.79916 4.74603V16.8416Z"
                fill={color}
                stroke={color}
                strokeWidth="1.72793"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
