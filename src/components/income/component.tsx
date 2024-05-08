import { memo } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

// Atoms
import { incomeState } from "@/atoms";

// Components
import { Input } from "@/components";

// Schema
import { addIncomeSchema } from "@/schema";

// Styles
import "./styles.css";

const AddIncome: React.FC = () => {
  // Hooks
  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
  } = useForm({
    resolver: yupResolver(addIncomeSchema),
  });

  // State
  const setIncome: SetterOrUpdater<number> = useSetRecoilState(incomeState);

  // Handlers
  const onSubmitIncome = ({ income }: { income: number }) => {
    setIncome(income);

    // Resetting fields.
    resetField("income");
  };

  return (
    <div className="add-income-container">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="add-income-button">
              <span className="add-income-button-text">Add Income</span>
              <ChevronRightIcon
                className={classNames("h-5 w-5 text-gray-900", {
                  "rotate-90 transform": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="add-income-panel">
              <form
                className="set-income-form"
                onSubmit={handleSubmit(onSubmitIncome)}
              >
                <Input
                  label="Amount"
                  name="income"
                  placeholder="Enter paycheck amount"
                  register={register}
                  error={errors.income}
                />
                <button className="set-income-button" type="submit">
                  Set Amount
                </button>
              </form>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default memo(AddIncome);
