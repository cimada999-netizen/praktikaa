import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState(null);
  const [orientation, setOrientation] = useState('portrait');

  // Состояние ориентации
  useEffect(() => {
    const handleOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };
    
    Dimensions.addEventListener('change', handleOrientation);
    handleOrientation(); // initial

    return () => {
      Dimensions.removeEventListener('change', handleOrientation);
    };
  }, []);

  const calculateSum = () => {
    const result = parseFloat(num1) + parseFloat(num2);
    setSum(result);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Екі санның қосындысы</Text>

      <View style={orientation === 'portrait' ? styles.inputContainer : styles.inputContainerLandscape}>
        <TextInput
          style={styles.input}
          placeholder="Сан 1"
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
        />
        <TextInput
          style={styles.input}
          placeholder="Сан 2"
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
        />
      </View>

      <Button title="Қосу" onPress={calculateSum} />

      {sum !== null && (
        <Text style={styles.result}>Қосынды: {sum}</Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // қарапайым ақ фон
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  inputContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    flex: 1,
    marginHorizontal: 5,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
});
