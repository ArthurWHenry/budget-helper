import { Dispatch, SetStateAction } from "react";

// Form Types
export type FormProps = {
  classes?: string;
  handleSubmit: any;
  children: any;
  options?: any;
  schema?: any;
};

export type SelectProps = {
  isDisabled?: boolean;
  label: string;
  name: string;
  options: any[];
  selected: { label: string; value: number };
  setSelected: Dispatch<SetStateAction<{ label: string; value: number }>>;
};

export type InputProps = {
  isDisabled?: boolean;
  label: string;
  name: string;
  placeholder: string;
  register: any;
  error: any;
};

// Expense Types
export type Expense = {
  id?: string;
  name: string;
  cost: number;
  expenseType: string;
  notes?: string;
};

export type ExpenseSchema = {
  name: string;
  cost: number;
  notes?: string;
};

// Stat Types
export type StatCardProps = {
  title: string;
  value: number;
};

// Table Types
export type TableExpense = {
  id: string;
  name: string;
  cost: number;
  expenseType: string;
  notes?: string;
  remove: JSX.Element;
};
