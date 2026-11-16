// src/app/index.tsx
import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useGoalStore } from "../store";

export default function GoalListScreen() {
  const router = useRouter();
  const cele = useGoalStore((state) => state.cele);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moje Cele (Lista)</Text>
      <Button title="Dodaj nowy cel" onPress={() => router.push("./form")} />

      <FlatList
        data={cele}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.goalName}>{item.nazwa}</Text>
            <Text>Status: {item.status}</Text>
            <Button
              title="Szczegóły"
              onPress={() => router.push(`./details/${item.id}`)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>Brak celów. Dodaj pierwszy!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  goalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
