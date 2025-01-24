import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import BirthdayCard from "./components/BirthdayCard";
import {useEffect, useState} from "react";
import {CardModel} from "./models/cardModel";
import {loadCards, saveCard} from "./utils/dataUtils";
import TextWithFont from "./components/TextWithFont";

export default function App() {
  const theme = useColorScheme();

  const [cards, setCards] = useState<CardModel[]>([]);

  const onAddClick = async () => {
    await saveCard("Alice", "2000-05-10", "#FF5733");
    setCards(await loadCards());
  }

  useEffect(() => {
    loadCards().then(setCards);
  }, []);

  useEffect(() => {
    console.log(cards)
  }, [cards]);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' ? styles.containerDark : null]}>
      <StatusBar />

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {cards.map((card) => (
              <BirthdayCard key={card.id} id={card.id} name={card.name} birthdate={new Date(card.birthdate)} colour={card.colour} />
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onAddClick}>
            <TextWithFont style={styles.buttonText}>+</TextWithFont>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dae2ec',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  containerDark: {
    backgroundColor: '#2a2a3c',
  },

  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },

  scrollContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',

    marginBottom: 15,
    marginRight: 15,
  },

  addButton: {
    width: 70,
    height: 70,
    backgroundColor: '#7979be',
    borderRadius: '30%'
  },

  buttonText: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',

    fontSize: 40,
  }
});
