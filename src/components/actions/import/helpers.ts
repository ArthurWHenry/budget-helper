export const getHeader = (header: string): string => {
  if (header === "NAME") return "name";
  if (header === "COST") return "cost";
  if (header === "EXPENSE TYPE") return "expenseType";
  if (header === "DATE") return "date";
  return "";
};
