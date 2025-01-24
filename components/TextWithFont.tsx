import {StyleProp, Text, TextStyle} from "react-native";
import {ReactNode} from "react";
import {useFonts} from "expo-font";

interface Props {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}

const TextWithFont = ({ children, style }: Props) => {
    const [fontsLoaded] = useFonts({
        'JetBrainsMono-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <Text style={[style, { fontFamily: 'JetBrainsMono-Regular' }]} >{children}</Text>
    );
};

export default TextWithFont;