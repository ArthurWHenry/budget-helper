import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

// Atoms
import { dataState } from "@/atoms";

// Components
import { InputField, SelectField } from "@/components/form";

// Data
import { expenseTypes } from "@/data";

// Schema
import { addExpenseSchema } from "@/schema";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

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

  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useRecoilState(dataState);
  const [selectedExpenseType, setSelectedExpenseType] = useState({
    label: "Want",
    value: 0,
  });

  const onSubmitExpense: SubmitHandler<ExpenseSchema> = (newData) => {
    setData([
      ...data,
      { ...newData, id: uuidv4(), expenseType: selectedExpenseType.label },
    ]);

    // Resetting fields.
    resetField("name");
    resetField("cost");
    resetField("notes");
    setSelectedExpenseType({ label: "Need", value: 0 });

    // Success message
    toast.success("Expense added successfully!");
  };

  return (
    <div className="bg-gray-50 w-full rounded-lg">
      <button
        className="flex w-full justify-between items-center p-4"
        onClick={() => setShowForm(!showForm)}
      >
        <div>
          <span className="text-gray-900 text-lg font-semibold">
            Add Expense
          </span>
        </div>
        <div>
          {showForm ? (
            <ChevronUpIcon className="h-6 w-6 text-gray-900" />
          ) : (
            <ChevronDownIcon className="h-6 w-6 text-gray-900" />
          )}
        </div>
      </button>
      {showForm && (
        <div className="gap-2 flex flex-col pb-4 px-4 border-t w-full">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(onSubmitExpense)}
          >
            <div className="flex pt-2 flex-col md:flex-row justify-between items-end gap-2 w-full">
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
                options={expenseTypes}
                selected={selectedExpenseType}
                setSelected={setSelectedExpenseType}
              />
              <InputField
                label="Notes"
                name="notes"
                placeholder="Add notes to expense"
                register={register}
                error={errors.notes}
              />
            </div>
            <button
              className="px-4 py-2 border font-semibold rounded-md bg-gray-900 text-gray-50 hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-linear disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:border-gray-300 w-full md:width-auto"
              disabled={Object.keys(errors).length > 0}
              type="submit"
            >
              <span>Add</span>
            </button>
          </form>
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-200 flex flex-col p-2 rounded-md">
              {Object.values(errors).map(({ message }, idx) => (
                <span className="text-red-900 text-xs" key={idx}>
                  {message}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AddExpense);
