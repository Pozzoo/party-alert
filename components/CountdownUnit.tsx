import {StyleSheet, View, Text, Animated, Easing} from "react-native";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";

interface Props {
    character: number;
}

const CountdownUnit = ({ character }: Props) => {
    const [flipTopAnim] = useState(new Animated.Value(1));
    const [flipBottomAnim] = useState(new Animated.Value(90));

    useEffect(() => {
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
        });
    }, [character]);

    const rotateInterpolateTop = flipTopAnim.interpolate({
        inputRange: [0, 360],  // Rotation from 0 to 360 degrees
        outputRange: ['0deg', '360deg'],  // Convert to 'deg' units
    });

    const rotateInterpolateBottom = flipBottomAnim.interpolate({
        inputRange: [0, 360],  // Rotation from 0 to 360 degrees
        outputRange: ['0deg', '360deg'],  // Convert to 'deg' units
    });

    const [fontsLoaded] = useFonts({
        'JetBrainsMono-Regular': require('../assets/fonts/JetBrainsMono-Regular.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={[styles.top, styles.common, styles.shadow]}>
                <Text style={[styles.text, styles.textTop]}>{character}</Text>
            </View>

            <Animated.View
                style={[styles.top, styles.flipTop, styles.common,
                    {
                        transform: [
                            { translateY: 14 },
                            { rotateX: rotateInterpolateTop },
                            { translateY: -14 },
                        ]
                    }
                ]}
            >
                <Text style={[styles.text, styles.textTop]}>{character - 1}</Text>
            </Animated.View>

            <View style={[styles.bottom, styles.common, styles.shadow]}>
                <Text style={[styles.text, styles.textBottom]}>{character - 1}</Text>
            </View>

            <Animated.View
                style={[styles.bottom, styles.flipBottom, styles.common,
                    {
                        transform: [
                            { translateY: -14 },
                            { rotateX: rotateInterpolateBottom },
                            { translateY: 14 },
                        ]
                    }
                ]}
            >
                <Text style={[styles.text, styles.textBottom]}>{character}</Text>
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

    bottom: {
        position: 'relative',
        backgroundColor: 'white',
        paddingTop: 0,

        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
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
        fontFamily: 'JetBrainsMono-Regular',
    },

    textTop: {
      top: 3,
    },

    textBottom: {
        top: -25,
    }
});


export default CountdownUnit;