import { StatusBar } from 'expo-status-bar';
import {Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View} from 'react-native';
import BirthdayCard from "./components/BirthdayCard";
import {useEffect, useState} from "react";
import {CardModel} from "./models/cardModel";
import {loadCards} from "./utils/dataUtils";
import TextWithFont from "./components/TextWithFont";
import useModal from "./hooks/useModal";
import NewBirthdate from "./components/NewBirthdate";
import {getDateObject} from "./utils/dateUtils";

export default function App() {
  const theme = useColorScheme();
  const modalManager = useModal();

  const [cards, setCards] = useState<CardModel[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [scaleValue] = useState(new Animated.Value(1));

  const scaleIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const scaleOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedCard(null);
    });
  };

  const checkPress = (id: number) => {
    if (selectedCard === id) return;

    scaleOut();
  }

  const onAddClick = async () => {
    scaleOut();

    modalManager.openModal(<NewBirthdate reloadCards={reloadCards} />)
  }

  const reloadCards =() => {
    loadCards().then(setCards);
  }

  useEffect(() => {
    if (selectedCard !== null) {
      scaleIn();
    }
  }, [selectedCard]);

  useEffect(() => {
    reloadCards();
  }, []);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' ? styles.containerDark : null]}>
      <StatusBar />

      <Pressable style={styles.contentWrapper} onPress={() => scaleOut()}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {cards.map((card) => {
            const dateArray = getDateObject(card.birthdate);
            const isSelected = card.id === selectedCard;

            return (
                <Pressable key={card.id} style={styles.pressableContainer} onLongPress={() => setSelectedCard(card.id!)} onPressIn={() => checkPress(card.id!)} >
                  <Animated.View style={{width: '100%', alignItems: 'center', justifyContent: 'center', transform: [{ scale: isSelected ? scaleValue : 1}]}}>
                    <BirthdayCard id={card.id!} name={card.name} birthdate={new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]))} colour={card.colour}/>
                  </Animated.View>
                </Pressable>
            )
          })}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onAddClick}>
            <TextWithFont style={styles.buttonText}>+</TextWithFont>
          </TouchableOpacity>
        </View>
      </Pressable>
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
  },

  pressableContainer: {
    width: '100%',
  }
});
