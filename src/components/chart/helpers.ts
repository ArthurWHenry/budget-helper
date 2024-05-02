const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function getColor(expenseType: string) {
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
