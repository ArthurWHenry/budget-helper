"use client";
import { useState } from "react";
import classNames from "classnames";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import { AddExpense, Chart, Form, InputField, Table } from "@/components";

// Schema
import { setIncomeSchema } from "@/schema";
import { RecoilRoot, useRecoilState } from "recoil";

function View() {
  const [data] = useRecoilState<Expense[]>(dataState);
  const [income, setIncome] = useRecoilState<number>(incomeState);

  // TODO: The idea is to have an export button to download the graphic a user creates.
  const [view, setView] = useState<"paycheck" | "monthly">("paycheck");

  // Helpers
  const leftover =
    (Number.isNaN(income) ? 0 : income) -
    data.reduce((acc, { cost }) => acc + cost, 0);

  const onSubmitIncome = ({ income }: { income: number }) => {
    setIncome(income);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50">
      <div className="h-32 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">Budget Helper</h1>
      </div>
      <div className="gap-2 flex border-b w-full justify-center border-gray-200">
        <button
          className={classNames(
            "border-t border-x px-4 py-2 bg-gray-200 transition duration-150 ease-linear hover:bg-gray-300",
            view === "paycheck" && "bg-gray-300"
          )}
          onClick={() => setView("paycheck")}
        >
          Paycheck Planner
        </button>
        <button
          className={classNames(
            "border-t border-x px-4 py-2 bg-gray-200 transition duration-150 ease-linear hover:bg-gray-300",
            view === "monthly" && "bg-gray-300"
          )}
          onClick={() => setView("monthly")}
        >
          Monthly Budget
        </button>
      </div>
      <div className="p-2">
        {view === "paycheck" ? (
          <section className="flex flex-col justify-center items-center gap-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-800">
              Paycheck Planner
            </h2>
            <div className="flex flex-col p-2 gap-2 justify-center items-center text-center">
              <label className="text-lg font-semibold text-gray-700">
                Paycheck amount
              </label>
              <Form
                classes="w-full flex flex-col items-center gap-2 border rounded-md px-6 py-4 bg-gray-200 border-gray-300 justify-center"
                handleSubmit={onSubmitIncome}
                schema={setIncomeSchema}
              >
                {({ register, formState }: any): JSX.Element => (
                  <>
                    <InputField
                      label="Paycheck amount (USD)"
                      name="income"
                      placeholder="Enter paycheck amount"
                      register={register}
                      error={formState.errors.income}
                    />
                    <button
                      className="px-2 py-1 bg-gray-900 text-gray-50 rounded-md font-semibold hover:bg-gray-50 hover:text-gray-900 transition duration-150 ease-linear border border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-900 disabled:border-gray-300"
                      type="submit"
                    >
                      Set Amount
                    </button>
                  </>
                )}
              </Form>
              <div className="flex">
                <span
                  className={classNames(
                    leftover < 0 ? "text-red-900" : "text-green-900"
                  )}
                >
                  Leftover:{" "}
                  {leftover < 0 ? `-$${Math.abs(leftover)}` : `$${leftover}`}
                </span>
              </div>
            </div>
            <AddExpense />
            <Chart />
            <Table />
          </section>
        ) : (
          <section>
            <h2>Monthly Budget</h2>
            <p>Coming soon...</p>
          </section>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <RecoilRoot>
      <View />
    </RecoilRoot>
  );
}
