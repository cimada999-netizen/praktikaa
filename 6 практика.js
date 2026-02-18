import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const data = [
  { id: '1', title: 'Алгебра', content: 'Алгебра — математикалық бөлім...' },
  { id: '2', title: 'Геометрия', content: 'Геометрия — пішіндер мен кеңістік туралы...' },
  { id: '3', title: 'Физика', content: 'Физика — табиғат заңдарын зерттейтін ғылым...' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Тақырып бойынша іздеу..."
        value={search}
        onChangeText={setSearch}
      />
      {selected ? (
        <View>
          <Text style={styles.title}>{selected.title}</Text>
          <Text style={styles.content}>{selected.content}</Text>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.button}>
            <Text style={styles.buttonText}>Артқа</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelected(item)} style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { fontSize: 18 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
