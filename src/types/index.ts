export type StatusCelu = "Aktywny" | "Zakoñczony" | "Anulowany";

// Encja podrzêdna (N)
export interface KamienMilowy {
  id: string; // UUID
  parentId: string; // Klucz obcy wskazuj¹cy na Cel.id
  nazwa: string;
  termin: string; // Data w formacie ISO (YYYY-MM-DD)
  ukonczony: boolean;
}

// Encja nadrzêdna (1)
export interface Cel {
  id: string; // UUID
  nazwa: string;
  termin: string; // Data w formacie ISO (YYYY-MM-DD)
  status: StatusCelu;
}
