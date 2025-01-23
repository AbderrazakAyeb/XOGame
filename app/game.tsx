import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GameScreen() {
  // Retrieve player names from URL parameters using useLocalSearchParams
  const { playerX = "Player X", playerO = "Player O" } = useLocalSearchParams<{
    playerX: string;
    playerO: string;
  }>();

  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handlePress = (index: number) => {
    if (board[index]) return;
    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";
    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);

    const winner = checkWinner(updatedBoard);
    if (winner) {
      Alert.alert(
        `${winner === "X" ? playerX : playerO} wins!`,
        "Start a new game.",
        [{ text: "Reset", onPress: resetGame }]
      );
      updateScores(winner);
    } else if (!updatedBoard.includes(null)) {
      Alert.alert("It's a draw!", "Start a new game.", [
        { text: "Reset", onPress: resetGame },
      ]);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  const checkWinner = (board: (string | null)[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const updateScores = (winner: string) => {
    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };

  const renderSquare = (value: string | null, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.square}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.scoreboard}>
        <Text style={styles.scoreText}>
          {playerX} (X): {scores.X}
        </Text>
        <Text style={styles.scoreText}>
          {playerO} (O): {scores.O}
        </Text>
      </View>
      <View style={styles.board}>
        {board.map((value, index) => renderSquare(value, index))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00aaff",
    marginBottom: 20,
  },
  scoreboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "#00aaff",
    borderWidth: 2,
    backgroundColor: "#1f2630",
  },
  square: {
    width: "33.33%",
    height: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3a3f47",
  },
  squareText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#e0e0e0",
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#00aaff",
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
