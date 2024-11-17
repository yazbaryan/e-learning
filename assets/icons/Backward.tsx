import { IconProps } from '../../types';
import Svg, { Path } from 'react-native-svg';

export default function BackwardIcon({ color = 'black' }: IconProps) {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <Path
                d="M9.83899 16.8416L2.0633 10.7938L9.83899 4.74603V16.8416Z"
                fill={color}
                stroke={color}
                strokeWidth="1.72793"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M19.3426 16.8416L11.5669 10.7938L19.3426 4.74603V16.8416Z"
                fill={color}
                stroke={color}
                strokeWidth="1.72793"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
