import {StyleSheet, View, Animated, Easing, useColorScheme} from "react-native";
import {useEffect, useState} from "react";
import TextWithFont from "./TextWithFont";

interface Props {
    character: number;
}

const CountdownUnit = ({ character }: Props) => {
    const theme = useColorScheme();

    const [flipTopAnim] = useState(new Animated.Value(1));
    const [flipBottomAnim] = useState(new Animated.Value(90));

    const [currentCharacter, setCurrentCharacter] = useState(character);
    const [nextCharacter, setNextCharacter] = useState(character);

    useEffect(() => {
        setNextCharacter(character);

        flipTopAnim.setValue(1);
        flipBottomAnim.setValue(90);

        Animated.timing(flipTopAnim, {
            toValue: 90,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
        }).start(() => {
            Animated.timing(flipBottomAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();

            setCurrentCharacter(character);
        });
    }, [character]);

    const rotateInterpolateTop = flipTopAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    const rotateInterpolateBottom = flipBottomAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <View style={[styles.top, styles.common, styles.shadow, theme === 'dark' ? styles.topDark : null]}>
                <TextWithFont style={[styles.text, styles.textTop, theme === 'dark' ? styles.textDark : null]}>{nextCharacter}</TextWithFont>
            </View>

            <Animated.View
                style={[styles.top, styles.flipTop, styles.common,
                    {
                        transform: [
                            { translateY: 14 },
                            { rotateX: rotateInterpolateTop },
                            { translateY: -14 },
                        ]
                    }, theme === 'dark' ? styles.topDark : null
                ]}
            >
                <TextWithFont style={[styles.text, styles.textTop, theme === 'dark' ? styles.textDark : null]}>{currentCharacter}</TextWithFont>
            </Animated.View>

            <View style={[styles.bottom, styles.common, styles.shadow, theme === 'dark' ? styles.bottomDark : null]}>
                <TextWithFont style={[styles.text, styles.textBottom, theme === 'dark' ? styles.textDark : null]}>{currentCharacter}</TextWithFont>
            </View>

            <Animated.View
                style={[styles.bottom, styles.flipBottom, styles.common,
                    {
                        transform: [
                            { translateY: -14 },
                            { rotateX: rotateInterpolateBottom },
                            { translateY: 14 },
                        ]
                    }, theme === 'dark' ? styles.bottomDark : null
                ]}
            >
                <TextWithFont style={[styles.text, styles.textBottom, theme === 'dark' ? styles.textDark : null]}>{nextCharacter}</TextWithFont>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 50,
        width: 35,
    },

    shadow: {
        shadowColor: '#99AABB',
        shadowOffset: { width: -2, height: 6 },
        shadowRadius: 6,
        shadowOpacity: .7,

        elevation: 4,
    },

    common: {
        alignItems: 'center',
        padding: 4,
        height: 28,
        overflow: 'hidden',
    },

    top: {
        position: 'relative',
        backgroundColor: '#e9e9e9',
        paddingBottom: 0,

        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
    },

    topDark: {
        backgroundColor: '#3e3e5b',
    },

    bottom: {
        position: 'relative',
        backgroundColor: 'white',
        paddingTop: 0,

        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },

    bottomDark: {
      backgroundColor: '#1e1e2f',
    },

    flipTop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    flipBottom: {
        position: 'absolute',
        top: '56%',
        width: '100%',
        height: '100%',
    },

    text: {
        position: 'absolute',
        fontSize: 40,
        minHeight: 0,
        color: '#1e1e2f'
    },

    textDark: {
        color: '#dae2ec',
    },

    textTop: {
      top: 3,
    },

    textBottom: {
        top: -25,
    }
});


export default CountdownUnit;