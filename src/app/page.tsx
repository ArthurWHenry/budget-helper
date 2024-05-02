"use client";
import { Toaster } from "react-hot-toast";
import classNames from "classnames";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import { AddExpense, Chart, Form, InputField, Table } from "@/components";

// Schema
import { setIncomeSchema } from "@/schema";
import { RecoilRoot, useRecoilState } from "recoil";
import { useState } from "react";

function View() {
  const [data] = useRecoilState<Expense[]>(dataState);
  const [dataView, setDataView] = useState<"table" | "chart">("table");
  const [income, setIncome] = useRecoilState<number>(incomeState);

  // Helpers
  const leftover =
    (Number.isNaN(income) ? 0 : income) -
    data.reduce((acc, { cost }) => acc + cost, 0);

  const onSubmitIncome = ({ income }: { income: number }) => {
    setIncome(income);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <section className="flex max-w-4xl mx-auto">
        <h1 className="text-lg font-bold text-gray-50 p-2">💸 Budget Helper</h1>
      </section>
      <section className="flex justify-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-300">
          Paycheck Planner
        </h2>
      </section>
      <main className="flex flex-col items-center justify-start max-w-4xl mx-auto p-4">
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <Form
            classes="flex flex-col gap-2 w-full bg-gray-50 rounded-lg p-4"
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
          <div className="w-full flex flex-col md:flex-row bg-gray-50 rounded-lg divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-900">
            <div className="flex flex-col md:w-1/2 justify-center items-center p-4 gap-2">
              <h3 className="font-semibold text-lg">Income</h3>
              <span
                className={classNames(
                  "text-xl",
                  income < 0 ? "text-red-900" : "text-green-900"
                )}
              >
                {income < 0
                  ? `-$${Math.abs(income).toLocaleString()}`
                  : `$${income.toLocaleString()}`}
              </span>
            </div>
            <div className="flex flex-col md:w-1/2 justify-center items-center p-4 gap-2">
              <h3 className="font-semibold text-lg">Leftover</h3>
              <span
                className={classNames(
                  "text-xl",
                  leftover < 0 ? "text-red-900" : "text-green-900"
                )}
              >
                {leftover < 0
                  ? `-$${Math.abs(leftover).toLocaleString()}`
                  : `$${leftover.toLocaleString()}`}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-200">Expenses</h2>
          </div>
          <AddExpense />
          <div className="flex flex-col w-full">
            <div className="flex justify-between bg-gray-50 rounded-lg divide-x divide-gray-900 overflow-hidden mb-4">
              <button
                className={classNames(
                  "w-1/2 p-2 font-semibold hover:bg-gray-200 hover:text-gray-700 duration-150 transition ease-linear",
                  {
                    "bg-gray-400 text-gray-900": dataView === "table",
                  }
                )}
                onClick={() => setDataView("table")}
              >
                Table
              </button>
              <button
                className={classNames(
                  "w-1/2 p-2 font-semibold hover:bg-gray-200 hover:text-gray-700 duration-150 transition ease-linear",
                  {
                    "bg-gray-400 text-gray-900": dataView === "chart",
                  }
                )}
                onClick={() => setDataView("chart")}
              >
                Chart
              </button>
            </div>
            {dataView === "table" ? <Table /> : <Chart />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <RecoilRoot>
      <Toaster position="top-right" />
      <View />
    </RecoilRoot>
  );
}
