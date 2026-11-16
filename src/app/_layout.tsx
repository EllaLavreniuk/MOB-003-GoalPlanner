import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Konfiguracja nagłówków dla poszczególnych ekranów */}
      <Stack.Screen name="index" options={{ title: "Moje Cele" }} />
      <Stack.Screen
        name="form"
        options={{ title: "Nowy Cel", presentation: "modal" }}
      />
      <Stack.Screen name="details/[id]" options={{ title: "Szczegóły Celu" }} />
    </Stack>
  );
}
