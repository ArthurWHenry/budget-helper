import { memo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Disclosure } from "@headlessui/react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

// Atoms
import { dataState } from "@/atoms";

// Components
import { Input, Select } from "@/components/form";

// Data
import { expenseTypes } from "@/data";

// Schema
import { addExpenseSchema } from "@/schema";

// Styles
import "./styles.css";

// Types
import { ExpenseSchema } from "@/types";

const AddExpense = () => {
  // Hooks
  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
  } = useForm({
    resolver: yupResolver(addExpenseSchema),
  });

  // State
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useRecoilState(dataState);
  const [selectedExpenseType, setSelectedExpenseType] = useState({
    label: "Need",
    value: 0,
  });

  // Handlers
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
    <div
      className={classNames("add-expense-container", { "shadow-md": !isOpen })}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="add-expense-button"
              onClick={(): void => setIsOpen(!isOpen)}
            >
              <span className="add-expense-button-text">Add Expense</span>
              <ChevronRightIcon
                className={classNames("h-5 w-5 text-gray-900", {
                  "rotate-90 transform": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="add-expense-panel">
              <div className="gap-2 flex flex-col pb-4 px-4 w-full">
                <form
                  className="add-expense-form"
                  onSubmit={handleSubmit(onSubmitExpense)}
                >
                  <div className="add-expense-form-container">
                    <Input
                      label="Name"
                      name="name"
                      placeholder="Type a name"
                      register={register}
                      error={errors.name}
                    />
                    <Input
                      label="Cost"
                      name="cost"
                      placeholder="Enter cost"
                      register={register}
                      error={errors.cost}
                    />
                    <Select
                      label="Type"
                      name="expenseType"
                      options={expenseTypes}
                      selected={selectedExpenseType}
                      setSelected={setSelectedExpenseType}
                    />
                    {/* <Input
                      label="Notes"
                      name="notes"
                      placeholder="Add notes to expense"
                      register={register}
                      error={errors.notes}
                    /> */}
                  </div>
                  <button
                    className="add-expense-button-submit"
                    disabled={Object.keys(errors).length > 0}
                    type="submit"
                  >
                    <span>Add</span>
                  </button>
                </form>
                {Object.keys(errors).length > 0 && (
                  <div className="add-expense-error">
                    {Object.values(errors).map(({ message }, idx) => (
                      <span key={idx}>{message}</span>
                    ))}
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default memo(AddExpense);
