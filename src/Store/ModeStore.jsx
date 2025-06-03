import { create } from "zustand";

const useMode = create((set) => ({
  mode: "dark",
  setMode: () =>
    set((state) => ({ mode: state.mode === "dark" ? "light" : "dark" })),
}));

export default useMode;
