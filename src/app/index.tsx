import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useGoalStore } from "../store";

export default function GoalListScreen() {
  const router = useRouter();
  const cele = useGoalStore((state) => state.cele);

  return (
    <View style={styles.container}>
      <Button title="Dodaj nowy cel" onPress={() => router.push("/form")} />

      <FlatList
        style={styles.list}
        data={cele}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.goalName}>{item.nazwa}</Text>
            <Text style={styles.goalInfo}>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Szczegóły"
                onPress={() => router.push(`/details/${item.id}`)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Brak celów. Dodaj pierwszy!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  list: { marginTop: 15 },
  card: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  goalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  goalInfo: { fontSize: 14, color: "#666", marginBottom: 10 },
  buttonContainer: { alignItems: "flex-start" },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});
