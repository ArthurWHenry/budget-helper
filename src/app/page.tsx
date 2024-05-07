"use client";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Tab } from "@headlessui/react";
import { Toaster } from "react-hot-toast";
import classNames from "classnames";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import {
  AddExpense,
  Chart,
  Header,
  SetIncome,
  StatCard,
  Table,
} from "@/components";

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
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-start max-w-4xl mx-auto p-4">
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="flex w-full gap-4 flex-col md:flex-row">
            <StatCard title="Income" value={income} />
            <StatCard title="Leftover" value={leftover} />
          </div>
          <SetIncome />
          <AddExpense />
          <Tab.Group>
            <Tab.List className="bg-gray-200 w-full flex gap-2 justify-between items-center p-2 rounded-lg shadow-inner">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      "shadow focus:outline-none w-1/2 bg-gray-50 rounded-md py-2 px-1 font-semibold transition duration-150 ease-linear hover:shadow-none text-gray-900",
                      { "shadow-none": selected }
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
                      "shadow focus:outline-none w-1/2 bg-gray-50 rounded-md py-2 px-1 font-semibold transition duration-150 ease-linear hover:shadow-none text-gray-900",
                      { "shadow-none": selected }
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
