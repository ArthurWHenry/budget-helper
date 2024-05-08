"use client";
import { Fragment } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { Toast, Toaster } from "react-hot-toast";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import {
  AddExpense,
  Chart,
  Header,
  AddIncome,
  StatCard,
  Table,
} from "@/components";

// Type
import { Expense } from "@/types";

function View() {
  // Selectors
  const data: Expense[] = useRecoilValue(dataState);
  const income: number = useRecoilValue(incomeState);

  // Helpers
  const leftover =
    (Number.isNaN(income) ? 0 : income) -
    data.reduce((acc, { cost }) => acc + cost, 0);

  return (
    <div className="page">
      <Header />
      <main className="main-container">
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <div className="stat-cards">
            <StatCard title="Income" value={income} />
            <StatCard title="Leftover" value={leftover} />
          </div>
          <AddIncome />
          <AddExpense />
          <Tab.Group>
            <Tab.List className="tab-list">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames("tab", { "shadow-none": selected })}
                  >
                    Table
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames("tab", { "shadow-none": selected })}
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
      <Toaster position="top-center" />
      <View />
    </RecoilRoot>
  );
}
