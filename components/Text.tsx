import { StyleSheet, TextProps, Text as BaseText } from 'react-native';

type Weight = 400 | 600 | 800;

const weightToFont: Record<Weight, string> = {
    400: 'Outfit_400Regular',
    600: 'Outfit_600SemiBold',
    800: 'Outfit_800ExtraBold',
};

export default function Text(props: TextProps) {
    const weight = StyleSheet.flatten(props.style).fontWeight || '';
    const fontFamily = weightToFont.hasOwnProperty(weight) ? (weightToFont as any)[weight] : weightToFont[400];

    return (
        <BaseText {...props} style={[props.style, { fontFamily }]}>
            {props.children}
        </BaseText>
    );
}
