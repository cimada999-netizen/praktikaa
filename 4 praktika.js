import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, Linking, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOK_TEXT = [
  { title: "Бөлім 1", content: "Бұл электронды кітаптың бірінші бөлімі. Мысалы, мәтін ..." },
  { title: "Бөлім 2", content: "Екінші бөлімде тағы да қызықты мәліметтер бар. ..." },
  { title: "Бөлім 3", content: "Үшінші бөлімде кейбір мысалдар келтірілген. ..." }
];

export default function App() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(BOOK_TEXT);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Чекпойнт сақтау/жүктеу
  useEffect(() => {
    (async () => {
      const savedIndex = await AsyncStorage.getItem("@checkpoint");
      if (savedIndex !== null) setCurrentIndex(parseInt(savedIndex));
    })();
  }, []);

  const saveCheckpoint = async (index) => {
    setCurrentIndex(index);
    await AsyncStorage.setItem("@checkpoint", index.toString());
  };

  const searchBook = (text) => {
    setSearch(text);
    const result = BOOK_TEXT.filter(b => 
      b.title.toLowerCase().includes(text.toLowerCase()) ||
      b.content.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <View style={styles.container}>
      {/* Реклама (просто баннер) */}
      <View style={styles.adBanner}>
        <Text style={{ textAlign: "center" }}>Реклама: Сізге қызықты өнім!</Text>
      </View>

      {/* Поиск */}
      <TextInput
        style={styles.searchInput}
        placeholder="Сөз немесе тақырып бойынша іздеу..."
        value={search}
        onChangeText={searchBook}
      />

      {/* Кітап мәтіні */}
      <ScrollView style={styles.bookContainer}>
        {filtered.length > 0 ? (
          <View>
            <Text style={styles.title}>{filtered[currentIndex]?.title}</Text>
            <Text style={styles.content}>{filtered[currentIndex]?.content}</Text>
          </View>
        ) : (
          <Text>Нәтиже табылмады</Text>
        )}
      </ScrollView>

      {/* Навигация */}
      <View style={styles.navButtons}>
        <Button
          title="Алдыңғы"
          disabled={currentIndex === 0}
          onPress={() => saveCheckpoint(currentIndex - 1)}
        />
        <Button
          title="Келесі"
          disabled={currentIndex === filtered.length - 1}
          onPress={() => saveCheckpoint(currentIndex + 1)}
        />
      </View>

      {/* Авторға хат */}
      <Button
        title="Авторға хат жазу"
        onPress={() => Linking.openURL("mailto:author@example.com")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 30 },
  adBanner: { height: 50, backgroundColor: "#ddd", justifyContent: "center", marginBottom: 10 },
  searchInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginBottom: 10 },
  bookContainer: { flex: 1, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24 },
  navButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }
});
