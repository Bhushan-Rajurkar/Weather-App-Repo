import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Weather App</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          This is a simple React Native weather application built using Expo and the OpenWeatherMap API.
        </Text>
        <Text style={styles.text}>
          Go to the "Weather" tab and enter any city name in the search bar to get real-time temperature, humidity, and wind speed updates!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
});
