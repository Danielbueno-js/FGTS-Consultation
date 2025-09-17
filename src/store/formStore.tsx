import { create } from "zustand";

interface StoreState {
  name: string;
  phone: string;
  birthday: string;
  fgtsValueWithdraw: string;
  setFgtsValueWithdraw: (value: string) => void;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setBirthday: (value: string) => void;
}

export const useFormStore = create<StoreState>((set) => ({
  name: "",
  phone: "",
  birthday: "",
  fgtsValueWithdraw: "",
  setName: (value) => set({ name: value }),
  setPhone: (value) => set({ phone: value }),
  setBirthday: (value) => set({ birthday: value }),
  setFgtsValueWithdraw: (value) => set({ fgtsValueWithdraw: value }),
}));
