// src/app/form.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { useGoalStore } from "../store";
import { Cel } from "../types";

export default function GoalFormScreen() {
  const router = useRouter();
  const addCel = useGoalStore((state) => state.addCel);
  const [nazwa, setNazwa] = useState("");

  const handleSave = () => {
    if (!nazwa.trim()) return; // walidacja

    const nowyCel: Cel = {
      id: uuid.v4() as string,
      nazwa: nazwa,
      termin: new Date().toISOString().split("T")[0], // Dziś jako domyślny termin
      status: "Aktywny",
    };

    addCel(nowyCel);
    router.back(); // Powrót do listy po zapisie
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formularz Celu</Text>
      <TextInput
        placeholder="Wpisz nazwę celu..."
        value={nazwa}
        onChangeText={setNazwa}
        style={styles.input}
      />
      <Button title="Zapisz" onPress={handleSave} color="green" />
      <View style={{ marginTop: 10 }}>
        <Button title="Anuluj" color="red" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
