import {View, StyleSheet} from "react-native";
import {addDays, resetHours} from "../utils/dateUtils";
import Countdown from "./Countdown";
import {getContrastColor} from "../utils/colourUtils";
import TextWithFont from "./TextWithFont";

interface Props {
    id: number;
    name: string,
    birthdate: Date,
    colour: string,
}

const BirthdayCard = ({ id, name, birthdate, colour }: Props) => {

    return (
        <View style={[styles.container, { backgroundColor: colour }]}>
            <TextWithFont style={[styles.name, { color: getContrastColor(colour) }]}>{name}</TextWithFont>

            <Countdown targetDate={resetHours(addDays(birthdate, 1))} colour={colour} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'center',
        width: '90%',
        padding: 15,
        borderRadius: 14
    },

    name: {
        fontSize: 22,
        marginBottom: 4
    }
});

export default BirthdayCard;