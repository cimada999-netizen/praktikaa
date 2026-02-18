import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function App() {
  const [x, setX] = useState("");
  const [result, setResult] = useState(null);

  const price = 2000;

  // Есептеу (теңдеу + шарт)
  const calculate = () => {
    const value = parseFloat(x);
    if (!value || value <= 0) return;

    let k = 1;

    if (value >= 300) k = 0.8;
    else if (value >= 100) k = 0.9;

    const y = value * price * k;

    setResult({ x: value, k, y });
  };

  // Генерация "графика" через View (без библиотек)
  const generateGraph = () => {
    let bars = [];

    for (let i = 50; i <= 400; i += 50) {
      let k = 1;
      if (i >= 300) k = 0.8;
      else if (i >= 100) k = 0.9;

      let y = i * price * k;

      bars.push(
        <View key={i} style={{ alignItems: "center", marginRight: 8 }}>
          <View
            style={{
              width: 20,
              height: y / 2000, // масштаб
              backgroundColor: "orange",
            }}
          />
          <Text style={{ color: "white", fontSize: 10 }}>{i}</Text>
        </View>
      );
    }

    return bars;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EXPO Snack Dev</Text>

      {/* Относительная разметка */}
      <View style={styles.flexRow}>
        <View style={styles.leftBlock}>
          <Text style={styles.label}>X (өнім саны)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={x}
            onChangeText={setX}
            placeholder="Введите X"
          />

          <TouchableOpacity style={styles.button} onPress={calculate}>
            <Text style={styles.buttonText}>Есептеу</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightBlock}>
          {result && (
            <>
              <Text style={styles.tableTitle}>Нәтиже</Text>

              {/* Табличная разметка */}
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.cell}>X</Text>
                  <Text style={styles.cell}>{result.x}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.cell}>Коэффициент</Text>
                  <Text style={styles.cell}>{result.k}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.cell}>Y</Text>
                  <Text style={styles.cell}>
                    {result.y.toLocaleString()} тг
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>

      {/* График X → Y */}
      <Text style={styles.graphTitle}>График (X → Y)</Text>

      <View style={styles.graphContainer}>
        {generateGraph()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "orange",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftBlock: {
    width: "45%",
  },
  rightBlock: {
    width: "50%",
  },
  label: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  tableTitle: {
    color: "orange",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#444",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  cell: {
    flex: 1,
    color: "white",
    padding: 8,
    textAlign: "center",
  },
  graphTitle: {
    color: "orange",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  graphContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
  },
});