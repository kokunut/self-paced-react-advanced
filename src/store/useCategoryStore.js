import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategoryStore = create(
  persist(
    (set) => ({
      category: "전체", 

      setCategory: (newCategory) => set({ category: newCategory }),
    }),
    {
      name:"restaurant-category-storage",
    }
  )
);
