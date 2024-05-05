type Expense = {
  id?: string;
  name: string;
  cost: number;
  expenseType: string;
  notes?: string;
};

type ExpenseSchema = {
  name: string;
  cost: number;
  notes?: string;
};

type StatCardProps = {
  title: string;
  value: number;
};

type TableExpense = {
  id: string;
  name: string;
  cost: number;
  expenseType: string;
  notes?: string;
  remove: JSX.Element;
};
