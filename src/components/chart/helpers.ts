// Types
import { Expense } from "@/types";

export const COLORS = [
  "#1f77b4", // muted blue
  "#ff7f0e", // safety orange
  "#2ca02c", // cooked asparagus green
  "#d62728", // brick red
  "#9467bd", // muted purple
  "#8c564b", // chestnut brown
  "#e377c2", // raspberry yogurt pink
  "#7f7f7f", // middle gray
  "#bcbd22", // curry yellow-green
  "#17becf", // blue-teal
];

export function getColor(index: number) {
  return COLORS[index % COLORS.length];
}

export function getTotalsColor(expenseType: string) {
  if (expenseType === "Need") return COLORS[0];
  if (expenseType === "Save") return COLORS[1];
  if (expenseType === "Want") return COLORS[2];
  if (expenseType === "Leftover") return COLORS[3];
  return COLORS[3];
}

export function getExpenseTypeTotals(data: Expense[]) {
  const totals: { [key: string]: number } = {};

  data.forEach((entry) => {
    const { expenseType, cost } = entry;
    if (totals[expenseType]) {
      totals[expenseType] += cost;
    } else {
      totals[expenseType] = cost;
    }
  });

  return totals;
}

export function sortDataByExpenseType(data: Expense[]) {
  const expenseTypeOrder: { [key: string]: number } = {
    Need: 0,
    Save: 1,
    Want: 2,
  };

  // Create a copy of data before sorting.
  const dataCopy = [...data];

  return dataCopy.sort((a, b) => {
    return expenseTypeOrder[a.expenseType] - expenseTypeOrder[b.expenseType];
  });
}
