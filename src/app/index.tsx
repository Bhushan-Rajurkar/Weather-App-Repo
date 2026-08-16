import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ActivityIndicator, Keyboard, ScrollView, StatusBar
} from 'react-native';

// Your WeatherAPI.com Key
const API_KEY = '36b785f7daca472d968151352261608';

export default function Index() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    Keyboard.dismiss();

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.error?.message || 'City not found');
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch data. Check your internet connection.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Dark content for light backgrounds */}
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Weather App</Text>
      
      {/* Search Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeather}
          placeholderTextColor="#9BA796"
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading & Error */}
      {loading && <ActivityIndicator size="large" color="#84A98C" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Weather Data Display */}
      {weather && !loading && (
        <View style={styles.weatherContainer}>
          
          {/* Current Weather */}
          <Text style={styles.cityName}>{weather.location.name}, {weather.location.country}</Text>
          <Text style={styles.temp}>{Math.round(weather.current.temp_c)}°C</Text>
          <Text style={styles.description}>{weather.current.condition.text}</Text>
          
          {/* Details Grid (Humidity, Wind, Sunrise, Sunset) */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weather.current.humidity}%</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Wind</Text>
                <Text style={styles.detailValue}>{weather.current.wind_kph} km/h</Text>
              </View>
            </View>
            
            {/* Sunrise / Sunset Row */}
            <View style={styles.detailRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Sunrise</Text>
                <Text style={styles.detailValue}>{weather.forecast.forecastday[0].astro.sunrise}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Sunset</Text>
                <Text style={styles.detailValue}>{weather.forecast.forecastday[0].astro.sunset}</Text>
              </View>
            </View>
          </View>

          {/* Hourly Timings (Horizontal Scroll) */}
          <Text style={styles.sectionTitle}>Today's Timings</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.hourlyScroll}
            contentContainerStyle={styles.hourlyContainer}
          >
            {weather.forecast.forecastday[0].hour.map((hourData: any, index: number) => {
              const timeString = hourData.time.split(' ')[1]; 
              return (
                <View key={index} style={styles.hourlyCard}>
                  <Text style={styles.hourlyTime}>{timeString}</Text>
                  <Text style={styles.hourlyTemp}>{Math.round(hourData.temp_c)}°</Text>
                  <Text style={styles.hourlyCondition}>{hourData.condition.text}</Text>
                </View>
              );
            })}
          </ScrollView>

          {/* 3-Day Forecast */}
          <Text style={styles.sectionTitle}>3-Day Forecast</Text>
          <View style={styles.forecastContainer}>
            {weather.forecast.forecastday.map((day: any, index: number) => (
              <View key={index} style={styles.forecastCard}>
                <Text style={styles.forecastDate}>
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.forecastCondition}>{day.day.condition.text}</Text>
                <View style={styles.forecastTemps}>
                  <Text style={styles.maxTemp}>{Math.round(day.day.maxtemp_c)}°</Text>
                  <Text style={styles.minTemp}>{Math.round(day.day.mintemp_c)}°</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      )}
    </ScrollView>
  );
}

// Earthy & Minimalist Styling
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5E9', // Soft Beige Background
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
    color: '#344E41', // Deep Earthy Green/Charcoal
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginRight: 10,
    fontSize: 16,
    color: '#344E41',
    borderWidth: 1,
    borderColor: '#E2E6D8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    backgroundColor: '#84A98C', // Light Sage Green
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#84A98C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  weatherContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Pure White for high contrast
    padding: 25,
    borderRadius: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E6D8', // Very light green-grey border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 5,
  },
  cityName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#344E41',
    marginBottom: 5,
  },
  temp: {
    fontSize: 64,
    fontWeight: '800',
    color: '#344E41',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 20,
    color: '#588157', // Medium muted green
    textAlign: 'center',
    fontWeight: '600',
  },
  detailsContainer: {
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E6D8',
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailBox: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F9FAED', // Extremely faint green/beige tint
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#EDF1E4',
  },
  detailLabel: {
    fontSize: 13,
    color: '#7C8A79',
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#344E41',
  },
  errorText: {
    color: '#D9534F',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  /* Shared Titles */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#344E41',
    marginTop: 30,
    marginBottom: 12,
    alignSelf: 'flex-start',
    width: '100%',
  },

  /* Hourly Timings Styles */
  hourlyScroll: {
    width: '100%',
  },
  hourlyContainer: {
    gap: 12,
    paddingVertical: 5,
  },
  hourlyCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    width: 85,
    borderWidth: 1,
    borderColor: '#E2E6D8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  hourlyTime: {
    fontSize: 13,
    color: '#7C8A79',
    marginBottom: 8,
    fontWeight: '600',
  },
  hourlyTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#344E41',
    marginBottom: 5,
  },
  hourlyCondition: {
    fontSize: 11,
    color: '#588157',
    textAlign: 'center',
    fontWeight: '500',
  },

  /* 3-Day Forecast Styles */
  forecastContainer: {
    width: '100%',
    gap: 12,
  },
  forecastCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E6D8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  forecastDate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#344E41',
    flex: 1.2,
  },
  forecastCondition: {
    fontSize: 13,
    color: '#588157',
    flex: 1.5,
    textAlign: 'center',
    fontWeight: '600',
  },
  forecastTemps: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    justifyContent: 'flex-end',
  },
  maxTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#344E41',
  },
  minTemp: {
    fontSize: 16,
    color: '#9BA796',
    fontWeight: '600',
  },
});
