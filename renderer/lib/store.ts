import create from "zustand";
import produce from "immer";
import { AppConfig, AppState } from "./models";

export const useStore = create<AppState>((set) => ({
  accounts: [],
  transactions: [],
  appConfig: {
    _ready: false,
  } as any,
  setAppConfig: (newAppConfig: AppConfig) => set({ appConfig: newAppConfig }),
  set: (fn) => set(produce(fn) as (state: AppState) => AppState),
}));
