export type StatusCelu = "Aktywny" | "Zakończony" | "Anulowany";

// Encja podrzędna (N)
export interface KamienMilowy {
  id: string; // UUID
  parentId: string; // Klucz obcy wskazujący na Cel.id
  nazwa: string;
  termin: string; // Data w formacie ISO (YYYY-MM-DD)
  ukonczony: boolean;
}

// Encja nadrzędna (1)
export interface Cel {
  id: string; // UUID
  nazwa: string;
  termin: string; // Data w formacie ISO (YYYY-MM-DD)
  status: StatusCelu;
}
