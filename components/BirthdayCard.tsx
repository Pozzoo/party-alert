import {View, StyleSheet, Pressable} from "react-native";
import {addDays, resetHours} from "../utils/dateUtils";
import Countdown from "./Countdown";
import {getContrastColor} from "../utils/colourUtils";
import TextWithFont from "./TextWithFont";
import DeleteIcon from "./delete-stroke-rounded";
import {deleteCard} from "../utils/dataUtils";


interface Props {
    id: number;
    name: string,
    birthdate: Date,
    colour: string,
    refreshCards: () => void,
    cardSelected: boolean,
}


const BirthdayCard = ({ id, name, birthdate, colour, refreshCards, cardSelected }: Props) => {

    return (
        <View style={[styles.container, { backgroundColor: colour }]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextWithFont style={[styles.name, { color: getContrastColor(colour) }]}>{name}</TextWithFont>

                {cardSelected && (
                         <Pressable onPress={() => {deleteCard(id).then(r => refreshCards())}}>
                            <DeleteIcon colour={getContrastColor(colour)} />
                        </Pressable>
                    )
                }
            </View>

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
        borderRadius: 14,
        marginBottom: 20
    },

    name: {
        fontSize: 22,
        marginBottom: 4
    }
});

export default BirthdayCard;