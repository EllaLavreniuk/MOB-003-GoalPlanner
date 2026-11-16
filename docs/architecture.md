# Architektura aplikacji GoalPlanner (MOB-003)

## 1. Przegl¹d ogólny

Aplikacja GoalPlanner zosta³a zbudowana z wykorzystaniem frameworka **React Native** (w œrodowisku Expo). Decyzja ta pozwala na stworzenie natywnej aplikacji mobilnej dla systemów Android oraz iOS przy u¿yciu jednej bazy kodu, jednoczeœnie spe³niaj¹c wymóg braku zewnêtrznego backendu (offline-first).

Architektura opiera siê na wyraŸnym podziale na warstwê prezentacji (UI), warstwê zarz¹dzania stanem (logika biznesowa) oraz warstwê dostêpu do danych (Storage).

## 2. Struktura katalogów

Projekt korzysta z nastêpuj¹cej struktury organizacyjnej (wewn¹trz folderu `src/` lub `app/` w przypadku Expo Router):

```text
/
??? src/
?   ??? components/      # Komponenty UI wielokrotnego u¿ytku (przyciski, karty, modale)
?   ??? screens/         # G³ówne widoki aplikacji (Lista celów, Szczegó³y, Formularze)
?   ??? store/           # Logika zarz¹dzania stanem globalnym (np. Zustand / React Context)
?   ??? services/        # Warstwa dostêpu do danych (obs³uga AsyncStorage)
?   ??? utils/           # Funkcje pomocnicze, walidatory (weryfikacja dat, logiki domenowej)
?   ??? types/           # Definicje typów/interfejsów (TypeScript) dla modelu danych
??? docs/                # Dokumentacja projektowa
??? reports/             # Sprawozdania z laboratoriów
```

## 3. Model danych i relacje

Aplikacja opiera siê na dwóch g³ównych encjach powi¹zanych relacj¹ **1:N** (Jeden Cel mo¿e posiadaæ wiele Kamieni milowych).

**Cel (Encja nadrzêdna)**

- `id` (UUID) - unikalny identyfikator
- `nazwa` (Text) - nazwa celu
- `termin` (Date) - ostateczna data realizacji
- `status` (Enum) - stan realizacji

**Kamieñ milowy (Encja podrzêdna)**

- `id` (UUID) - unikalny identyfikator
- `parentId` (UUID) - klucz obcy powi¹zany z `Cel.id`
- `nazwa` (Text) - nazwa etapu
- `termin` (Date) - termin realizacji etapu (walidowany: nie mo¿e przekraczaæ terminu Celu)
- `ukoñczony` (Boolean) - flaga oznaczaj¹ca realizacjê

**Integralnoœæ danych:**
Usuniêcie encji nadrzêdnej (Cel) jest blokowane na poziomie logiki aplikacji, jeœli istniej¹ przypisane do niej encje podrzêdne (Kamienie milowe). Zapewnia to spójnoœæ relacyjn¹.

## 4. Przep³yw danych i zarz¹dzanie stanem

Zarz¹dzanie stanem realizowane jest w sposób scentralizowany (np. za pomoc¹ Zustand lub React Context API), aby oddzieliæ logikê biznesow¹ od widoków (spe³nienie wymogu ARCH-01 i ARCH-02).

**Cykl przep³ywu danych:**

1. **Inicjalizacja:** Przy starcie aplikacji warstwa danych (serwis `Storage`) asynchronicznie pobiera zapisane ci¹gi JSON z `AsyncStorage`, parsuje je i ³aduje do globalnego stanu w pamiêci RAM.
2. **Prezentacja:** Ekrany (np. "Lista Celów") subskrybuj¹ globalny stan i automatycznie siê odœwie¿aj¹, gdy ulegnie on zmianie.
3. **Akcja u¿ytkownika:** U¿ytkownik wype³nia formularz (stan lokalny komponentu). Po klikniêciu "Zapisz", surowe dane trafiaj¹ do funkcji waliduj¹cej.
4. **Walidacja i mutacja:** Jeœli walidacja przejdzie pomyœlnie, globalny stan zostaje zaktualizowany (rekord zostaje dodany).
5. **Persystencja:** W odpowiedzi na zmianê stanu, serwis danych natychmiast serializuje nowy stan i nadpisuje plik w `AsyncStorage`, zapewniaj¹c trwa³oœæ zapisu.

## 5. Komponenty i nawigacja

Nawigacja pomiêdzy logicznymi czêœciami aplikacji realizowana jest poprzez stos (Stack Navigator):

- **Ekrany Listy:** Wyœwietlaj¹ podsumowanie. Obliczaj¹ i prezentuj¹ pochodne wartoœci biznesowe (np. procent ukoñczonych kamieni milowych).
- **Ekrany Szczegó³ów:** Pobieraj¹ z globalnego stanu powi¹zane encje na podstawie przekazanego parametru routingu (np. `id` Celu).
- **Ekrany Formularzy (Tworzenie/Edycja):** Obs³uguj¹ wprowadzanie danych, wyœwietlaj¹ komunikaty walidacyjne na bie¿¹co oraz blokuj¹ niepoprawny zapis. Zawieraj¹ mechanizmy ostrzegaj¹ce przed b³êdami u¿ytkownika.
