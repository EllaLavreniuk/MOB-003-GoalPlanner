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
  const [termin, setTermin] = useState(new Date().toISOString().split("T")[0]);

  // Добавляем специальное состояние для хранения текста ошибки
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = () => {
    setErrorMsg(""); // Очищаем старую ошибку при новом нажатии

    // Валидация 1
    if (!nazwa.trim()) {
      setErrorMsg("Błąd: Nazwa celu nie może być pusta.");
      return;
    }

    // Валидация 2
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(termin)) {
      setErrorMsg("Błąd: Termin musi być w formacie YYYY-MM-DD.");
      return;
    }

    const nowyCel: Cel = {
      id: uuid.v4() as string,
      nazwa: nazwa.trim(),
      termin: termin,
      status: "Aktywny",
    };

    addCel(nowyCel);

    // Принудительно возвращаем на главную, даже если нет истории браузера!
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formularz Celu</Text>

      {/* Если есть ошибка, показываем её красным текстом */}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      <Text style={styles.label}>Nazwa celu:</Text>
      <TextInput
        placeholder="Wpisz nazwę celu..."
        value={nazwa}
        onChangeText={setNazwa}
        style={styles.input}
      />

      <Text style={styles.label}>Termin (YYYY-MM-DD):</Text>
      <TextInput
        placeholder="np. 2026-12-31"
        value={termin}
        onChangeText={setTermin}
        style={styles.input}
      />

      <Button title="Zapisz" onPress={handleSave} color="green" />
      <View style={{ marginTop: 10 }}>
        {/* Принудительный возврат на главную при отмене */}
        <Button
          title="Anuluj"
          color="red"
          onPress={() => router.replace("/")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  label: { fontSize: 16, marginBottom: 5, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});
