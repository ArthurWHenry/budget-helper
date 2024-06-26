"use client";
import { Fragment } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classNames from "classnames";

// Atoms
import { expensesDataState, incomeState } from "@/atoms";

// Components
import {
  AddExpense,
  ExpensesChart,
  ExpensesTable,
  Header,
  AddIncome,
  StatCard,
  ClearDialog,
  TrendChart,
} from "@/components";

// Type
import { Expense } from "@/types";

function View() {
  // Selectors
  const data: Expense[] = useRecoilValue(expensesDataState);
  const income: number = useRecoilValue(incomeState);

  // Helpers
  const leftover =
    (Number.isNaN(income) ? 0 : income) -
    data.reduce((acc, { cost }) => acc + cost, 0);

  return (
    <main className="">
      <Header />
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <TrendChart />
        <div className="stat-cards">
          <StatCard title="Income" value={income} />
          <StatCard title="Leftover" value={leftover} />
        </div>
        <AddIncome />
        <AddExpense />
        <TabGroup className="w-full min-h-96">
          <TabList className="tab-list">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    "tab",
                    selected ? "shadow-none" : "shadow-md"
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
                    "tab",
                    selected ? "shadow-none" : "shadow-md"
                  )}
                >
                  Chart
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels className="w-full">
            <TabPanel>
              <ExpensesTable />
            </TabPanel>
            <TabPanel>
              <ExpensesChart />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <RecoilRoot>
      <View />
      <ClearDialog />
    </RecoilRoot>
  );
}
