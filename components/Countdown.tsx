import {View, StyleSheet, useColorScheme} from "react-native";
import CountdownUnit from "./CountdownUnit";
import {useEffect, useState} from "react";
import {compareDates} from "../utils/dateUtils";
import {getContrastColor} from "../utils/colourUtils";
import TextWithFont from "./TextWithFont";

interface Props {
    targetDate: Date;
    colour: string;
}

const Countdown = ({ targetDate, colour }: Props) => {

    const [remainingMonths, setRemainingMonths] = useState<number>(0);
    const [remainingDays, setRemainingDays] = useState<number>(0);
    const [remainingHours, setRemainingHours] = useState<number>(0);
    const [remainingMinutes, setRemainingMinutes] = useState<number>(0);

    useEffect(() => {
        setInterval(() => {
            const currentDate = new Date();

            const result = compareDates(targetDate, currentDate);

            setRemainingMinutes(result.minutes);
            setRemainingHours(result.hours);
            setRemainingDays(result.days);
            setRemainingMonths(result.months);
        }, 1000);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextWithFont style={{ color: getContrastColor(colour) }}>Months</TextWithFont>
                <View style={styles.digitWrapper}>
                    <CountdownUnit character={Math.floor(remainingMonths / 10)} />
                    <CountdownUnit character={Math.ceil(remainingMonths % 10)} />
                </View>
            </View>

            <View style={styles.wrapper}>
                <TextWithFont style={{ color: getContrastColor(colour) }}>Days</TextWithFont>
                <View style={styles.digitWrapper}>
                    <CountdownUnit character={Math.floor(remainingDays / 10)} />
                    <CountdownUnit character={Math.ceil(remainingDays % 10)} />
                </View>
            </View>

            <View style={styles.wrapper}>
                <TextWithFont style={{ color: getContrastColor(colour) }}>Hours</TextWithFont>
                <View style={styles.digitWrapper}>
                    <CountdownUnit character={Math.floor(remainingHours / 10)} />
                    <CountdownUnit character={Math.ceil(remainingHours % 10)} />
                </View>
            </View>

            <View style={styles.wrapper}>
                <TextWithFont style={{ color: getContrastColor(colour) }}>Minutes</TextWithFont>
                <View style={styles.digitWrapper}>
                    <CountdownUnit character={Math.floor(remainingMinutes / 10)} />
                    <CountdownUnit character={Math.ceil(remainingMinutes % 10)} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    digitWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
    },
});

export default Countdown;