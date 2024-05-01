const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function getColor(expenseType: string) {
  if (expenseType === "want") return COLORS[0];
  if (expenseType === "need") return COLORS[1];
  if (expenseType === "save") return COLORS[2];
  if (expenseType === "leftover") return COLORS[3];
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
    need: 0,
    want: 1,
    save: 2,
  };

  // Create a copy of data before sorting.
  const dataCopy = [...data];

  return dataCopy.sort((a, b) => {
    return expenseTypeOrder[a.expenseType] - expenseTypeOrder[b.expenseType];
  });
}
