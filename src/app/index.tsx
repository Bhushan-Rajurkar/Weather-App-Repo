// import * as Device from 'expo-device';
// import { Platform, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
//
// import { AnimatedIcon } from '@/components/animated-icon';
// import { HintRow } from '@/components/hint-row';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { WebBadge } from '@/components/web-badge';
// import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
//
// function getDevMenuHint() {
//   if (Platform.OS === 'web') {
//     return <ThemedText type="small">use browser devtools</ThemedText>;
//   }
//   if (Device.isDevice) {
//     return (
//       <ThemedText type="small">
//         shake device or press <ThemedText type="code">m</ThemedText> in terminal
//       </ThemedText>
//     );
//   }
//   const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
//   return (
//     <ThemedText type="small">
//       press <ThemedText type="code">{shortcut}</ThemedText>
//     </ThemedText>
//   );
// }
//
// export default function HomeScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         <ThemedView style={styles.heroSection}>
//           <AnimatedIcon />
//           <ThemedText type="title" style={styles.title}>
//             Welcome to&nbsp;Expo
//           </ThemedText>
//         </ThemedView>
//
//         <ThemedText type="code" style={styles.code}>
//           get started
//         </ThemedText>
//
//         <ThemedView type="backgroundElement" style={styles.stepContainer}>
//           <HintRow
//             title="Try editing"
//             hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
//           />
//           <HintRow title="Dev tools" hint={getDevMenuHint()} />
//           <HintRow
//             title="Fresh start"
//             hint={<ThemedText type="code">npm run reset-project</ThemedText>}
//           />
//         </ThemedView>
//
//         {Platform.OS === 'web' && <WebBadge />}
//       </SafeAreaView>
//     </ThemedView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   safeArea: {
//     flex: 1,
//     paddingHorizontal: Spacing.four,
//     alignItems: 'center',
//     gap: Spacing.three,
//     paddingBottom: BottomTabInset + Spacing.three,
//     maxWidth: MaxContentWidth,
//   },
//   heroSection: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     paddingHorizontal: Spacing.four,
//     gap: Spacing.four,
//   },
//   title: {
//     textAlign: 'center',
//   },
//   code: {
//     textTransform: 'uppercase',
//   },
//   stepContainer: {
//     gap: Spacing.three,
//     alignSelf: 'stretch',
//     paddingHorizontal: Spacing.three,
//     paddingVertical: Spacing.four,
//     borderRadius: Spacing.four,
//   },
// });

//
// import React, { useState } from 'react';
// import {
//   StyleSheet, Text, View, TextInput, TouchableOpacity,
//   ActivityIndicator, Keyboard
// } from 'react-native';
//
// // Paste your OpenWeatherMap API Key here
// const API_KEY = '36b785f7daca472d968151352261608';
//
// export default function Index() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const fetchWeather = async () => {
//     if (!city) return;
//
//     setLoading(true);
//     setError(null);
//     Keyboard.dismiss(); // Hides the keyboard when search is pressed
//
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data = await response.json();
//
//       if (response.ok) {
//         setWeather(data);
//       } else {
//         setError(data.message || 'City not found');
//         setWeather(null);
//       }
//     } catch (err) {
//       setError('Failed to fetch data. Check your internet connection.');
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Weather App</Text>
//
//       {/* Search Bar */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter city name..."
//           value={city}
//           onChangeText={setCity}
//           onSubmitEditing={fetchWeather}
//           placeholderTextColor="#9CA3AF"
//         />
//         <TouchableOpacity style={styles.button} onPress={fetchWeather}>
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>
//
//       {/* Loading Indicator */}
//       {loading && <ActivityIndicator size="large" color="#3B82F6" />}
//
//       {/* Error Message */}
//       {error && <Text style={styles.errorText}>{error}</Text>}
//
//       {/* Weather Data Display */}
//       {weather && !loading && (
//         <View style={styles.weatherContainer}>
//           <Text style={styles.cityName}>{weather.name}, {weather.sys.country}</Text>
//           <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
//           <Text style={styles.description}>{weather.weather[0].description}</Text>
//
//           <View style={styles.detailsContainer}>
//             <View style={styles.detailBox}>
//               <Text style={styles.detailLabel}>Humidity</Text>
//               <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
//             </View>
//             <View style={styles.detailBox}>
//               <Text style={styles.detailLabel}>Wind Speed</Text>
//               <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }
//
// // Styling
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     paddingTop: 80,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#1F2937',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     marginBottom: 30,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     fontSize: 16,
//     color: '#1F2937',
//   },
//   button: {
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   weatherContainer: {
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//     borderRadius: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cityName: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 5,
//   },
//   temp: {
//     fontSize: 56,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginVertical: 10,
//   },
//   description: {
//     fontSize: 18,
//     textTransform: 'capitalize',
//     marginBottom: 25,
//     color: '#6B7280',
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   detailBox: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     marginBottom: 5,
//   },
//   detailValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#4B5563',
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });



// import React, { useState } from 'react';
// import {
//   StyleSheet, Text, View, TextInput, TouchableOpacity,
//   ActivityIndicator, Keyboard
// } from 'react-native';
//
// // Your WeatherAPI.com Key
// const API_KEY = '36b785f7daca472d968151352261608';
//
// export default function Index() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const fetchWeather = async () => {
//     if (!city) return;
//
//     setLoading(true);
//     setError(null);
//     Keyboard.dismiss(); // Hides the keyboard when search is pressed
//
//     try {
//       // Updated endpoint for WeatherAPI.com
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
//       );
//       const data = await response.json();
//
//       if (response.ok) {
//         setWeather(data);
//       } else {
//         // WeatherAPI returns errors inside an "error" object
//         setError(data.error?.message || 'City not found');
//         setWeather(null);
//       }
//     } catch (err) {
//       setError('Failed to fetch data. Check your internet connection.');
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Weather App</Text>
//
//       {/* Search Bar */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter city name..."
//           value={city}
//           onChangeText={setCity}
//           onSubmitEditing={fetchWeather}
//           placeholderTextColor="#9CA3AF"
//         />
//         <TouchableOpacity style={styles.button} onPress={fetchWeather}>
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>
//
//       {/* Loading Indicator */}
//       {loading && <ActivityIndicator size="large" color="#3B82F6" />}
//
//       {/* Error Message */}
//       {error && <Text style={styles.errorText}>{error}</Text>}
//
//       {/* Weather Data Display - Updated for WeatherAPI JSON format */}
//       {weather && !loading && (
//         <View style={styles.weatherContainer}>
//           <Text style={styles.cityName}>{weather.location.name}, {weather.location.country}</Text>
//           <Text style={styles.temp}>{Math.round(weather.current.temp_c)}°C</Text>
//           <Text style={styles.description}>{weather.current.condition.text}</Text>
//
//           <View style={styles.detailsContainer}>
//             <View style={styles.detailBox}>
//               <Text style={styles.detailLabel}>Humidity</Text>
//               <Text style={styles.detailValue}>{weather.current.humidity}%</Text>
//             </View>
//             <View style={styles.detailBox}>
//               <Text style={styles.detailLabel}>Wind Speed</Text>
//               {/* Changed to km/h as it is standard in WeatherAPI */}
//               <Text style={styles.detailValue}>{weather.current.wind_kph} km/h</Text>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }
//
// // Styling (remains the same)
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     paddingTop: 80,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#1F2937',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     marginBottom: 30,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     fontSize: 16,
//     color: '#1F2937',
//   },
//   button: {
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   weatherContainer: {
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//     borderRadius: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cityName: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 5,
//   },
//   temp: {
//     fontSize: 56,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginVertical: 10,
//   },
//   description: {
//     fontSize: 18,
//     textTransform: 'capitalize',
//     marginBottom: 25,
//     color: '#6B7280',
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   detailBox: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     marginBottom: 5,
//   },
//   detailValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#4B5563',
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

//
// import React, { useState } from 'react';
// import {
//   StyleSheet, Text, View, TextInput, TouchableOpacity,
//   ActivityIndicator, Keyboard, ScrollView
// } from 'react-native';
//
// // Your WeatherAPI.com Key
// const API_KEY = '36b785f7daca472d968151352261608';
//
// export default function Index() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   const fetchWeather = async () => {
//     if (!city) return;
//
//     setLoading(true);
//     setError(null);
//     Keyboard.dismiss(); // Hides the keyboard when search is pressed
//
//     try {
//       // Updated endpoint to get the 3-day forecast
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no`
//       );
//       const data = await response.json();
//
//       if (response.ok) {
//         setWeather(data);
//       } else {
//         setError(data.error?.message || 'City not found');
//         setWeather(null);
//       }
//     } catch (err) {
//       setError('Failed to fetch data. Check your internet connection.');
//       setWeather(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Weather App</Text>
//
//       {/* Search Bar */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter city name..."
//           value={city}
//           onChangeText={setCity}
//           onSubmitEditing={fetchWeather}
//           placeholderTextColor="#9CA3AF"
//         />
//         <TouchableOpacity style={styles.button} onPress={fetchWeather}>
//           <Text style={styles.buttonText}>Search</Text>
//         </TouchableOpacity>
//       </View>
//
//       {/* Loading Indicator */}
//       {loading && <ActivityIndicator size="large" color="#3B82F6" />}
//
//       {/* Error Message */}
//       {error && <Text style={styles.errorText}>{error}</Text>}
//
//       {/* Weather Data Display */}
//       {weather && !loading && (
//         <View style={styles.weatherContainer}>
//
//           {/* Current Weather Section */}
//           <Text style={styles.cityName}>{weather.location.name}, {weather.location.country}</Text>
//           <Text style={styles.temp}>{Math.round(weather.current.temp_c)}°C</Text>
//           <Text style={styles.description}>{weather.current.condition.text}</Text>
//
//           <View style={styles.detailsContainer}>
//             <View style={styles.detailBox}>
//               <Text style={styles.detailLabel}>Humidity</Text>
//               <Text style={styles.detailValue}>{weather.current.humidity}%</Text>
//             </View>
//             <View style={styles.detailBox}>
//               <Text style={styles.detailLabel}>Wind Speed</Text>
//               <Text style={styles.detailValue}>{weather.current.wind_kph} km/h</Text>
//             </View>
//           </View>
//
//           {/* 3-Day Forecast Section */}
//           <Text style={styles.forecastTitle}>3-Day Forecast</Text>
//           <View style={styles.forecastContainer}>
//             {weather.forecast.forecastday.map((day: any, index: number) => (
//               <View key={index} style={styles.forecastCard}>
//                 <Text style={styles.forecastDate}>
//                   {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//                 </Text>
//
//                 <Text style={styles.forecastCondition}>{day.day.condition.text}</Text>
//
//                 <View style={styles.forecastTemps}>
//                   <Text style={styles.maxTemp}>{Math.round(day.day.maxtemp_c)}°</Text>
//                   <Text style={styles.minTemp}>{Math.round(day.day.mintemp_c)}°</Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//
//         </View>
//       )}
//     </ScrollView>
//   );
// }
//
// // Styling
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     paddingTop: 80,
//     paddingHorizontal: 20,
//     paddingBottom: 40, // Added bottom padding for scrolling
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#1F2937',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     marginBottom: 30,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     fontSize: 16,
//     color: '#1F2937',
//   },
//   button: {
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   weatherContainer: {
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     padding: 30,
//     borderRadius: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cityName: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 5,
//   },
//   temp: {
//     fontSize: 56,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginVertical: 10,
//   },
//   description: {
//     fontSize: 18,
//     textTransform: 'capitalize',
//     marginBottom: 25,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   detailBox: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     marginBottom: 5,
//   },
//   detailValue: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#4B5563',
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//
//   /* --- New Forecast Styles --- */
//   forecastTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#374151',
//     marginTop: 30,
//     marginBottom: 15,
//     alignSelf: 'flex-start',
//     width: '100%',
//   },
//   forecastContainer: {
//     width: '100%',
//     gap: 10,
//   },
//   forecastCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     padding: 15,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   forecastDate: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#4B5563',
//     flex: 1.2,
//   },
//   forecastCondition: {
//     fontSize: 12,
//     color: '#6B7280',
//     flex: 1.5,
//     textAlign: 'center',
//   },
//   forecastTemps: {
//     flexDirection: 'row',
//     gap: 10,
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   maxTemp: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#111827',
//   },
//   minTemp: {
//     fontSize: 16,
//     color: '#9CA3AF',
//   },
// });


import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ActivityIndicator, Keyboard, ScrollView
} from 'react-native';

// Your WeatherAPI.com Key
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

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
      <Text style={styles.title}>Weather App</Text>

      {/* Search Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeather}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading & Error */}
      {loading && <ActivityIndicator size="large" color="#3B82F6" />}
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
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weather.current.wind_kph} km/h</Text>
              </View>
            </View>

            {/* New Sunrise / Sunset Row */}
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

          {/* New Hourly Timings (Horizontal Scroll) */}
          <Text style={styles.sectionTitle}>Today's Timings</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hourlyScroll}
            contentContainerStyle={styles.hourlyContainer}
          >
            {weather.forecast.forecastday[0].hour.map((hourData: any, index: number) => {
              // WeatherAPI returns time as "YYYY-MM-DD HH:MM". We split to just get "HH:MM"
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

// Styling
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1F2937',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  weatherContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
  },
  temp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 20,
    color: '#6B7280',
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailBox: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  detailLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },

  /* Shared Titles */
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
    width: '100%',
  },

  /* Hourly Timings Styles */
  hourlyScroll: {
    width: '100%',
  },
  hourlyContainer: {
    gap: 10,
    paddingVertical: 5,
  },
  hourlyCard: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: 80,
  },
  hourlyTime: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  hourlyTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  hourlyCondition: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  /* 3-Day Forecast Styles */
  forecastContainer: {
    width: '100%',
    gap: 10,
  },
  forecastCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  forecastDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    flex: 1.2,
  },
  forecastCondition: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1.5,
    textAlign: 'center',
  },
  forecastTemps: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  maxTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  minTemp: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});