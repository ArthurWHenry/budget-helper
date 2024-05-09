import { atom, RecoilState } from "recoil";

// Types
import { Expense } from "@/types";

/**
 * Clear dialog state.
 *
 * @type {RecoilState<boolean>}
 * @remarks This state is used to toggle the clear dialog.
 */
export const clearDialogState: RecoilState<boolean> = atom({
  key: "clearDialog",
  default: false,
});

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

/**
 * View totals state.
 *
 * @type {RecoilState<boolean>}
 * @remarks This state is used to toggle the view of the totals.
 */
export const viewTotalsState: RecoilState<boolean> = atom({
  key: "viewTotals",
  default: false,
});
