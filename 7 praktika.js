import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [usd, setUsd] = useState(null);

  useEffect(() => {
    // Погода (open-meteo)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=51.16&longitude=71.43&current_weather=true')
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));

    // Курс доллара (пример открытого API)
    fetch('https://api.exchangerate.host/latest?base=USD&symbols=KZT')
      .then(res => res.json())
      .then(data => setUsd(data.rates.KZT));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>JSON Тест</Text>

      {weather && (
        <Text>Погода: {weather.temperature}°C, ветер {weather.windspeed} км/ч</Text>
      )}

      {usd && (
        <Text>1 USD = {usd} KZT</Text>
      )}

      <Image
        source={{uri: 'https://picsum.photos/200'}}
        style={{width: 200, height: 200, marginTop: 20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  header: { fontSize:20, fontWeight:'bold', marginBottom:20 }
});
