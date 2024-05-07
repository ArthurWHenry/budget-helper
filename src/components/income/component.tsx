import { memo } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

// Atoms
import { incomeState } from "@/atoms";

// Components
import { Form, Input } from "@/components";

// Schema
import { setIncomeSchema } from "@/schema";

// Styles
import "./styles.css";

const AddIncome: React.FC = () => {
  // State
  const setIncome: SetterOrUpdater<number> = useSetRecoilState(incomeState);

  // Handlers
  const onSubmitIncome = ({ income }: { income: number }) => {
    setIncome(income);
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
              <Form
                classes="set-income-form"
                handleSubmit={onSubmitIncome}
                schema={setIncomeSchema}
              >
                {({ register, formState }: any): JSX.Element => (
                  <>
                    <Input
                      label="Amount"
                      name="income"
                      placeholder="Enter paycheck amount"
                      register={register}
                      error={formState.errors.income}
                    />
                    <button className="set-income-button" type="submit">
                      Set Amount
                    </button>
                  </>
                )}
              </Form>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default memo(AddIncome);
