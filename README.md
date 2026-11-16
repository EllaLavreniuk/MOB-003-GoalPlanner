# GoalPlanner (MOB-003) 👋

Mobilna aplikacja typu offline-first do zarządzania celami oraz powiązanymi z nimi kamieniami milowymi. Projekt został wygenerowany przy użyciu środowiska [Expo](https://expo.dev) oraz narzędzia `create-expo-app`.

## ✨ Główne funkcjonalności

- **Struktura nawigacyjna:** Zaimplementowany wzorzec Master-Detail za pomocą nowoczesnego systemu **Expo Router** (nawigacja oparta na systemie plików / file-based routing).
- **Architektura danych:** Zdefiniowane relacyjne modele danych w TypeScript (główna encja `Cel` w relacji 1:N z encją `Kamień milowy`).
- **Zarządzanie rekordami:** Obsługa operacji CRUD (Create, Read) za pomocą dedykowanych formularzy i widoków szczegółów.
- **Walidacja interfejsu:** Zaawansowana weryfikacja danych wejściowych użytkownika (m.in. blokada pustych pól, walidacja formatu daty YYYY-MM-DD z wyświetlaniem komunikatów błędu w UI).
- **Trwałość danych (Offline):** Zapis i odczyt stanu aplikacji w pamięci lokalnej urządzenia przy wykorzystaniu biblioteki **Zustand** połączonej z **AsyncStorage**.

## 🚀 Uruchomienie projektu (Szybki start)

1. **Zainstaluj wymagane zależności:**

   npm install

2. **Uruchom serwer deweloperski:**

   npx expo start

W terminalu pojawią się opcje pozwalające na uruchomienie i testowanie aplikacji:

- Wciśnij `w`, aby otworzyć aplikację bezpośrednio w **przeglądarce internetowej** (development build).
- Uruchom na **emulatorze Android** (wymaga zainstalowanego środowiska Android Studio).
- Uruchom na **symulatorze iOS** (wymaga środowiska Xcode na systemie macOS).
- Zeskanuj wygenerowany kod QR za pomocą aplikacji **Expo Go** na swoim smartfonie, aby przetestować działanie na fizycznym urządzeniu.

Rozwój aplikacji odbywa się poprzez edycję plików w katalogu `src/app` (lub `app`).

## 🛠 Dodatkowa konfiguracja i narzędzia

- **Resetowanie projektu:** Uruchomienie komendy `npm run reset-project` przeniesie obecny kod do folderu `app-example` i utworzy pusty katalog `app` do budowy aplikacji od zera.
- **Weryfikacja kodu (Linter):** Aby sprawdzić jakość i spójność kodu, uruchom `npx expo lint`. Więcej informacji znajdziesz w przewodniku ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/).
- **Typowanie (TypeScript):** Projekt jest w pełni otypowany. Konfiguracja opisana jest w dokumencie ["Using TypeScript"](https://docs.expo.dev/guides/typescript/).

## 📚 Więcej o technologii Expo

Aby dowiedzieć się więcej na temat rozwijania aplikacji wieloplatformowych, warto zapoznać się z poniższymi materiałami:

- [Dokumentacja Expo](https://docs.expo.dev/) – Podstawy oraz zaawansowane poradniki architektoniczne.
- [Samouczek Expo](https://docs.expo.dev/tutorial/introduction/) – Przewodnik krok po kroku pokazujący proces tworzenia aplikacji na Androida, iOS oraz Web.
- [Expo na GitHubie](https://github.com/expo/expo) – Otwarte repozytorium platformy.
- [Społeczność Discord](https://chat.expo.dev) – Oficjalny kanał do zadawania pytań i wymiany wiedzy z innymi programistami.
