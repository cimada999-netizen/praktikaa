import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [sum, setSum] = useState(null);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  const calculateSum = () => {
    const result = parseFloat(num1 || 0) + parseFloat(num2 || 0);
    setSum(result);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Екі санның қосындысы</Text>

        <View style={
          orientation === 'portrait' 
          ? styles.inputContainer 
          : styles.inputContainerLandscape
        }>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  inputContainerLandscape: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    margin: 5,
    borderRadius: 8,
    fontSize: 18,
    flex: 1,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
