import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'birthday_cards';

export const saveCard = async (name: string, birthdate: string, colour: string) => {
    try {
        const existingCards = await loadCards();

        const newCard = { id: Date.now(), name, birthdate, colour };

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...existingCards, newCard]));
    } catch (e) {
        console.error("Error saving card", e);
    }
};

export const loadCards = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error loading cards", e);
        return [];
    }
};

export const deleteCard = async (id: number) => {
    try {
        const existingCards = await loadCards();
        const updatedCards = existingCards.filter((card: any) => card.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    } catch (e) {
        console.error("Error deleting card", e);
    }
};