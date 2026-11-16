// src/app/details/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useGoalStore } from "../../store";

export default function GoalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const cel = useGoalStore((state) => state.cele.find((c) => c.id === id));

  if (!cel) {
    return (
      <View style={styles.container}>
        <Text>Nie znaleziono celu!</Text>
        <Button title="Wróć" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły: {cel.nazwa}</Text>
      <Text style={styles.info}>Termin: {cel.termin}</Text>
      <Text style={styles.info}>Status: {cel.status}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Wróć do listy" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
});
