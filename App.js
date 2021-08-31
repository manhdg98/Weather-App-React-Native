import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';

import SearchInput from './components/SearchInput';

export default function App() {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');

  const handleUpdateLocation = async (city) => {
    if (!city) return;

    setLoading(true)
    try {
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(
        locationId,
      );

      setLoading(false);
      setError(false);
      setLocation(location);
      setTemperature(temperature);
      setWeather(weather);
    } catch (error) {
      setLoading(false);
      setError(true);
    }

    setLocation(city);
  };

  useEffect(() => {
    setWeather('Clear')
  }, []);


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ url: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t1.6435-9/134320841_2514658698840206_1898236449443735895_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=3wmPJJIGB7oAX-NNe-n&_nc_ht=scontent.fhan3-3.fna&oh=867264c5d3210fa8bba64794ed813c37&oe=614F08E7' }}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      }
    })
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 10,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },

});
