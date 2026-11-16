import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Cel, KamienMilowy } from "../types";

interface GoalState {
  cele: Cel[];
  kamienie: KamienMilowy[];
  addCel: (cel: Cel) => void;
  addKamien: (kamien: KamienMilowy) => void;
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      cele: [],
      kamienie: [],
      addCel: (cel) => set((state) => ({ cele: [...state.cele, cel] })),
      addKamien: (kamien) =>
        set((state) => ({ kamienie: [...state.kamienie, kamien] })),
    }),
    {
      name: "goal-storage", // klucz w AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
