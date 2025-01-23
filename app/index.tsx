import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function PlayerNameScreen() {
  const [playerX, setPlayerX] = useState<string>("");
  const [playerO, setPlayerO] = useState<string>("");
  const router = useRouter();

  const handleStartGame = () => {
    if (!playerX.trim() || !playerO.trim()) {
      Alert.alert("Error", "Both players must enter their names.");
      return;
    }
    // Navigate to the game screen with player names as params
    router.push({
      pathname: "/game",
      params: { playerX, playerO },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Player Names</Text>
      <TextInput
        style={styles.input}
        placeholder="Player X Name"
        placeholderTextColor="#888"
        value={playerX}
        onChangeText={setPlayerX}
      />
      <TextInput
        style={styles.input}
        placeholder="Player O Name"
        placeholderTextColor="#888"
        value={playerO}
        onChangeText={setPlayerO}
      />
      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00aaff",
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#00aaff",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#1f2630",
    color: "#ffffff",
    marginBottom: 20,
    fontSize: 18,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00aaff",
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
