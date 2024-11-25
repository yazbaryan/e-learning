import { IconProps } from '../../types';
import Svg, { Path } from 'react-native-svg';

export default function PauseIcon({ color = 'black' }: IconProps) {
    return (
        <Svg width="24" height="24" viewBox="0 0 1024 1024">
            <Path
                fill={color}
                d="M941.967463 109.714286v804.571428q0 14.857143-10.857143 25.714286t-25.714286 10.857143H612.824606q-14.857143 0-25.714286-10.857143t-10.857143-25.714286V109.714286q0-14.857143 10.857143-25.714286t25.714286-10.857143h292.571428q14.857143 0 25.714286 10.857143t10.857143 25.714286z m-512 0v804.571428q0 14.857143-10.857143 25.714286t-25.714286 10.857143H100.824606q-14.857143 0-25.714286-10.857143t-10.857143-25.714286V109.714286q0-14.857143 10.857143-25.714286t25.714286-10.857143h292.571428q14.857143 0 25.714286 10.857143t10.857143 25.714286z"
            />
        </Svg>
    );
}
