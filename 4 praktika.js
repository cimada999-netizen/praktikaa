import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Linking,
  StyleSheet,
} from "react-native";
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

  // Жүктеу (checkpoint)
  useEffect(() => {
    (async () => {
      const savedIndex = await AsyncStorage.getItem("@checkpoint");
      if (savedIndex !== null) {
        setCurrentIndex(parseInt(savedIndex));
      }
    })();
  }, []);

  // Сақтау
  const saveCheckpoint = async (index) => {
    setCurrentIndex(index);
    await AsyncStorage.setItem("@checkpoint", index.toString());
  };

  // Іздеу
  const searchBook = (text) => {
    setSearch(text);
    const result = BOOK_TEXT.filter(
      (b) =>
        b.title.toLowerCase().includes(text.toLowerCase()) ||
        b.content.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(result);
    setCurrentIndex(0);
  };

  return (
    <View style={styles.container}>

      {/* Реклама */}
      <View style={styles.adBanner}>
        <Text>Реклама: Сізге қызықты өнім!</Text>
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
            <Text style={styles.title}>
              {filtered[currentIndex]?.title}
            </Text>
            <Text style={styles.content}>
              {filtered[currentIndex]?.content}
            </Text>
          </View>
        ) : (
          <Text style={{ textAlign: "center" }}>
            Нәтиже табылмады
          </Text>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  adBanner: {
    width: "90%",
    height: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
  },
  searchInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  bookContainer: {
    width: "90%",
    maxHeight: 250,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 15,
  },
});
