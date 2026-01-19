import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISidebar {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSidebar = create<ISidebar>()(
  persist(
    (set) => ({
      isOpen: true,
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "sidebar-storage",
    }
  )
);