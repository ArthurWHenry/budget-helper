import { memo } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import classNames from "classnames";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

// Atoms
import { incomeState } from "@/atoms";

// Components
import { Form, InputField } from "@/components";

// Schema
import { setIncomeSchema } from "@/schema";

const SetIncome: React.FC = () => {
  // State
  const setIncome: SetterOrUpdater<number> = useSetRecoilState(incomeState);

  // Handlers
  const onSubmitIncome = ({ income }: { income: number }) => {
    setIncome(income);
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg">
      <Disclosure>
        <Disclosure.Button className="flex w-full justify-between items-center p-4">
          <div>
            <span className="text-gray-900 text-lg font-semibold">
              Set Paycheck Amount
            </span>
          </div>
          <ChevronRightIcon
            className={classNames("h-5 w-5 text-gray-900", {
              "rotate-90 transform": open,
            })}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="border-t rounded-b-lg w-full pb-4 px-4 pt-2">
          <Form
            classes="flex flex-col gap-2 bg-gray-50"
            handleSubmit={onSubmitIncome}
            schema={setIncomeSchema}
          >
            {({ register, formState }: any): JSX.Element => (
              <>
                <InputField
                  label="Paycheck amount"
                  name="income"
                  placeholder="Enter paycheck amount"
                  register={register}
                  error={formState.errors.income}
                />
                <button
                  className="px-4 py-2 border font-semibold rounded-md bg-gray-900 text-gray-50 hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-linear disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:border-gray-300 w-full md:width-auto"
                  type="submit"
                >
                  Set Amount
                </button>
              </>
            )}
          </Form>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default memo(SetIncome);
