import { atom, RecoilState } from "recoil";

// Types
import { Expense } from "@/types";

/**
 * Income state.
 *
 * @type {RecoilState<number>}
 * @remarks This state is used to store the user's income.
 */
export const incomeState: RecoilState<number> = atom({
  key: "income",
  default: 0,
});

/**
 * Data state.
 *
 * @type {RecoilState<Expense[]>}
 * @remarks This state is used to store the user's expenses.
 */
export const dataState: RecoilState<Expense[]> = atom({
  key: "data",
  default: [] as Expense[],
});
