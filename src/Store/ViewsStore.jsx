import { create } from "zustand";

const useView = create((set) => ({
  viewCount: localStorage.getItem("viewCount") || 0,
  increeseCount: () =>
    set((state) => {
      const newCount = +state.viewCount + 1;
      localStorage.setItem("viewCount", newCount);
      return {
        viewCount: +state.viewCount + 1,
      };
    }),
}));

export default useView;
