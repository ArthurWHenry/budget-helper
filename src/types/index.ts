type Expense = {
  id: string;
  name: string;
  cost: number;
  expenseType: string;
  notes: string;
};

type TableExpense = {
  id: string;
  name: string;
  cost: number;
  expenseType: string;
  notes: string;
  remove: JSX.Element;
};
