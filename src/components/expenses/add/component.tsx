import { memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import { InputField, SelectField } from "@/components/form";

// Data
import { expenseTypes } from "@/data";

// Schema
import { addExpenseSchema } from "@/schema";

const AddExpense = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(addExpenseSchema),
  });

  const income = useRecoilValue(incomeState);
  const [data, setData] = useRecoilState(dataState);

  const onSubmitExpense: SubmitHandler<Expense> = (newData) => {
    setData([...data, { ...newData, id: uuidv4() }]);

    // Resetting fields.
    resetField("name");
    resetField("cost");
    resetField("notes");
    setValue("expenseType", "want");
  };

  return (
    <form
      className="flex justify-center items-start gap-4 max-w-4xl border rounded-md px-6 py-4 bg-gray-200 border-gray-300"
      onSubmit={handleSubmit(onSubmitExpense)}
    >
      <InputField
        label="Name"
        name="name"
        placeholder="Type a name"
        register={register}
        error={errors.name}
      />
      <InputField
        label="Cost"
        name="cost"
        placeholder="Enter cost"
        register={register}
        error={errors.cost}
      />
      <SelectField
        label="Type"
        name="expenseType"
        register={register}
        error={errors.expenseType}
        options={expenseTypes}
      />
      <InputField
        label="Notes"
        name="notes"
        placeholder="Add notes to expense"
        register={register}
        error={errors.notes}
      />
      <button
        className="self-center bg-gray-900 rounded-md px-2 py-1 font-semibold hover:bg-gray-50 transition text-gray-50 hover:text-gray-900 duration-150 ease-linear border border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:border-gray-300"
        disabled={Object.keys(errors).length > 0 || !income}
        type="submit"
      >
        <span>Add</span>
      </button>
    </form>
  );
};

export default memo(AddExpense);
