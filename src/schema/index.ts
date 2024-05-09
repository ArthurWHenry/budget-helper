import * as yup from "yup";

export const addExpenseSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name field is required.")
    .max(60, "Name must be less than 60 characters."),
  cost: yup
    .number()
    .typeError("Cost must be of number value.")
    .required("Cost field is required."),
  // expenseType: yup.string().required("Expense type is required."),
  date: yup.date().required("Date field is required."),
  notes: yup.string().max(160, "Name must be less than 25 characters."),
});

export const addIncomeSchema = yup.object().shape({
  income: yup
    .number()
    .min(0, "Income must be greater than or equal to 0.")
    .required({ excludeEmptyString: true })
    .typeError("Income must be of number value."),
});
