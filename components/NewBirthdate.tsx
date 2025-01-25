import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import ModalWrapper from "./ModalWrapper";
import {useState} from "react";
import {CardModel} from "../models/cardModel";
import useModal from "../hooks/useModal";
import {saveCard} from "../utils/dataUtils";

const colours = [
    "#007FFF", "#32CD32", "#FF69B4", "#FF4500", "#FFD300", "#00FFFF", "#9400D3", "#FF77FF", "#98FF98", "#87CEEB", "#FF6F61", "#8A2BE2"
]

const NewBirthdate = () => {
    const modalManager = useModal();

    const [formData, setFormData] = useState<CardModel>({
        name: '',
        birthdate: '',
        colour: '#007FFF'
    })

    const onTextChangeHandler = (value: string) => {
        setFormData((currentData) => ({
            ...currentData,
            name: value
        }))
    }

    const onBirthdayChangeHandler = (value: string) => {
        let cleaned = value.replace(/\D/g, "");

        if (cleaned.length > 8) {
            cleaned = cleaned.substring(0, 8);
        }

        let formatted = cleaned;
        if (cleaned.length > 4) {
            formatted = `${cleaned.substring(0, 4)}/${cleaned.substring(4)}`;
        }
        if (cleaned.length > 6) {
            formatted = `${cleaned.substring(0, 4)}/${cleaned.substring(4, 6)}/${cleaned.substring(6)}`;
        }

        setFormData((currentData) => ({
            ...currentData,
            birthdate: formatted
        }))
    }

    const handleAdd = () => {
        if (formData.name === '') {
            return; //TODO: ADD ERROR MESSAGE
        }

        if (formData.birthdate.length < 10 || formData.birthdate === '') {
            return; //TODO: ADD ERROR MESSAGE
        }

        saveCard(formData.name, formData.birthdate, formData.colour).then(() => modalManager.closeModal());


    }

    return (
        <ModalWrapper style={styles.modalStyle}>
            <Text style={[styles.text, { marginBottom: 10 }]}>New BDay Card</Text>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={{marginLeft: 8}}>Name:</Text>
                    <TextInput style={styles.input} placeholder="Name..." value={formData.name} onChangeText={onTextChangeHandler} />
                </View>
                <View style={styles.column}>
                    <Text style={{marginLeft: 8}}>BirthDate:</Text>
                    <TextInput style={styles.input} placeholder="YYYY/MM/DD" value={formData.birthdate} onChangeText={onBirthdayChangeHandler} keyboardType='numeric' />
                </View>
            </View>

            <View style={styles.colours}>
                {colours.map((value) => {
                    const isActive = value === formData.colour;

                    return (
                        <View key={value}>
                            <Pressable android_ripple={{color: 'transparent'}} android_disableSound onPress={() => {
                                setFormData((currentData) => ({
                                    ...currentData,
                                    colour: value
                                }));
                            }}>
                                <View style={[styles.circle, isActive && { borderColor: value }]}>
                                    <View style={[styles.circleInside, { backgroundColor: value }]}/>
                                </View>
                            </Pressable>
                        </View>
                    )
                })}
            </View>

            <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                <Pressable style={styles.button} onPress={handleAdd}>
                    <View>
                        <Text>Add</Text>
                    </View>
                </Pressable>
            </View>
        </ModalWrapper>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        width: '80%',
    },

    text: {
        fontSize: 24,
        color: 'black',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '49%',
    },


    input: {
        backgroundColor: '#a3c7e0',
        borderRadius: 12,
        width: '100%',
        padding: 8,
    },

    colours: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    circle: {
        width: 30 + 3 * 4,
        height: 30 + 3 * 4,
        borderRadius: '50%',
        marginBottom: 12,
        borderWidth: 3,
        borderColor: 'transparent',
    },

    circleInside: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        position: 'absolute',
        top: 3,
        left: 3,
    },

    button: {
        backgroundColor: '#68aee3',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
    }
});

export default NewBirthdate;