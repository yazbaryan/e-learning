import SpeakingHoc from '../hoc/SpeakingHoc';
import Speaking from '../components/Speaking';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationParamList } from '../types';

export default function SpeakingScreen() {
    const route = useRoute<RouteProp<NavigationParamList, 'Speaking'>>();

    return (
        <SpeakingHoc>
            <Speaking item={route.params} />
        </SpeakingHoc>
    );
}
