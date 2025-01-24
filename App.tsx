import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import Countdown from "./components/Countdown";
import {addDays, resetHours} from "./utils/dateUtils";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Countdown targetDate={resetHours(addDays(new Date("2025-03-24"), 1))} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ccdad1',
  }
});
