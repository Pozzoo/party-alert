import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import CountdownUnit from "./components/CountdownUnit";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <CountdownUnit character={8}/>
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
