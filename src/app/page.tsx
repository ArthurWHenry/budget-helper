"use client";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Tab } from "@headlessui/react";
import { Toaster } from "react-hot-toast";
import classNames from "classnames";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import { AddExpense, Chart, SetIncome, StatCard, Table } from "@/components";

// Schema
import { Fragment } from "react";

function View() {
  // Selectors
  const data: Expense[] = useRecoilValue(dataState);
  const income: number = useRecoilValue(incomeState);

  // Helpers
  const leftover =
    (Number.isNaN(income) ? 0 : income) -
    data.reduce((acc, { cost }) => acc + cost, 0);

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
          <SetIncome />
          <div className="flex w-full gap-4 flex-col md:flex-row">
            <StatCard title="Income" value={income} />
            <StatCard title="Leftover" value={leftover} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-200">Expenses</h2>
          </div>
          <AddExpense />
          <Tab.Group>
            <Tab.List className="bg-gray-700 w-full flex gap-2 justify-between items-center p-2 rounded-lg">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      "focus:outline-none w-1/2 rounded-md py-2 px-1 font-semibold transition duration-150 ease-linear hover:bg-gray-600 hover:text-gray-100",
                      selected
                        ? "bg-gray-50 text-gray-900"
                        : "bg-gray-700 text-gray-200"
                    )}
                  >
                    Table
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      "focus:outline-none w-1/2 rounded-md py-2 px-1 font-semibold transition duration-150 ease-linear hover:bg-gray-600 hover:text-gray-100",
                      selected
                        ? "bg-gray-50 text-gray-900"
                        : "bg-gray-700 text-gray-200"
                    )}
                  >
                    Chart
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="w-full">
              <Tab.Panel>
                <Table />
              </Tab.Panel>
              <Tab.Panel>
                <Chart />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
