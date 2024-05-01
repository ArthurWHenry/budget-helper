import * as yup from "yup";

export const addExpenseSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Name can only contain alphanumeric characters."
    )
    .required("Name field is required.")
    .max(25, "Name must be less than 25 characters."),
  cost: yup
    .number()
    .typeError("Cost must be of number value.")
    .required("Cost field is required."),
  expenseType: yup.string().required(),
  notes: yup.string().max(160, "Name must be less than 25 characters."),
});

export const setIncomeSchema = yup.object().shape({
  income: yup
    .number()
    .min(0, "Income must be greater than or equal to 0.")
    .required({ excludeEmptyString: true })
    .typeError("Income must be of number value."),
});
