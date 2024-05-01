import { atom, RecoilState } from "recoil";

export const incomeState: RecoilState<number> = atom({
  key: "income",
  default: 0,
});

export const dataState: RecoilState<Expense[]> = atom({
  key: "data",
  default: [] as Expense[],
});
