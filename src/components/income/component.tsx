import { memo, useState } from "react";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setIncome: SetterOrUpdater<number> = useSetRecoilState(incomeState);

  // Handlers
  const onSubmitIncome = ({ income }: { income: number }) => {
    setIncome(income);

    // Resetting fields.
    resetField("income");
  };

  return (
    <div
      className={classNames("add-income-container", { "shadow-md": !isOpen })}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="add-income-button"
              onClick={(): void => setIsOpen(!isOpen)}
            >
              <span className="add-income-button-text">Add Income</span>
              <ChevronRightIcon
                className={classNames("h-5 w-5 text-gray-900", {
                  "rotate-90 transform": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="add-income-panel">
              <div className="gap-2 flex flex-col pb-4 px-4 w-full">
                <form
                  className="add-income-form"
                  onSubmit={handleSubmit(onSubmitIncome)}
                >
                  <Input
                    label="Amount"
                    name="income"
                    placeholder="Enter paycheck amount"
                    register={register}
                    error={errors.income}
                  />

                  <button className="add-income-button-submit" type="submit">
                    Set Income
                  </button>
                </form>
                {Object.keys(errors).length > 0 && (
                  <div className="add-income-error">
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

export default memo(AddIncome);
