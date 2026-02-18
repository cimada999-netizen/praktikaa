import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  // Данные между терезелер
  const [screen1Data, setScreen1Data] = useState({
    optionA: false,
    optionB: false,
  });

  const [screen2Data, setScreen2Data] = useState({
    switch1: false,
    switch2: false,
  });

  // Терезелердің контенті
  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.centerContent}
          >
            <Text style={styles.title}>Терезе 1: Галочки</Text>
            <View style={styles.optionRow}>
              <Text style={styles.label}>Option A</Text>
              <Switch
                value={screen1Data.optionA}
                onValueChange={(val) =>
                  setScreen1Data({ ...screen1Data, optionA: val })
                }
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.label}>Option B</Text>
              <Switch
                value={screen1Data.optionB}
                onValueChange={(val) =>
                  setScreen1Data({ ...screen1Data, optionB: val })
                }
              />
            </View>

            <Button
              title="Келесі терезе"
              onPress={() => setCurrentScreen(2)}
            />
          </ScrollView>
        );

      case 2:
        return (
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.centerContent}
          >
            <Text style={styles.title}>Терезе 2: Switch компоненттері</Text>
            <View style={styles.optionRow}>
              <Text style={styles.label}>Switch 1</Text>
              <Switch
                value={screen2Data.switch1}
                onValueChange={(val) =>
                  setScreen2Data({ ...screen2Data, switch1: val })
                }
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.label}>Switch 2</Text>
              <Switch
                value={screen2Data.switch2}
                onValueChange={(val) =>
                  setScreen2Data({ ...screen2Data, switch2: val })
                }
              />
            </View>

            <Button
              title="Алдыңғы терезе"
              onPress={() => setCurrentScreen(1)}
            />
            <View style={{ marginTop: 10 }}>
              <Button
                title="Келесі терезе"
                onPress={() => setCurrentScreen(3)}
              />
            </View>
          </ScrollView>
        );

      case 3:
        return (
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.centerContent}
          >
            <Text style={styles.title}>Терезе 3: Мәліметтерді көрсету</Text>
            <Text style={styles.info}>Screen 1 Data:</Text>
            <Text>Option A: {screen1Data.optionA ? "Иә" : "Жоқ"}</Text>
            <Text>Option B: {screen1Data.optionB ? "Иә" : "Жоқ"}</Text>

            <Text style={[styles.info, { marginTop: 20 }]}>Screen 2 Data:</Text>
            <Text>Switch 1: {screen2Data.switch1 ? "Иә" : "Жоқ"}</Text>
            <Text>Switch 2: {screen2Data.switch2 ? "Иә" : "Жоқ"}</Text>

            <View style={{ marginTop: 20 }}>
              <Button
                title="Алдыңғы терезе"
                onPress={() => setCurrentScreen(2)}
              />
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 10,
  },
  screen: {
    flex: 1,
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "orange",
    marginBottom: 20,
    textAlign: "center",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  info: {
    color: "orange",
    fontSize: 18,
    marginBottom: 5,
  },
});
