import { memo, use, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Helpers
import {
  getColor,
  getExpenseTypeTotals,
  sortDataByExpenseType,
} from "./helpers";

const Chart = () => {
  // State
  const [viewTotals, setViewTotals] = useState<boolean>(false);

  // Selectors
  const data = useRecoilValue(dataState);
  const income = useRecoilValue(incomeState);

  // Helpers
  const isHidden = data.length < 1;
  const sortedData = sortDataByExpenseType(data);
  const expenseTypeTotals = getExpenseTypeTotals(sortedData);
  const chartData = Object.keys(expenseTypeTotals).map((expenseType) => ({
    name: expenseType,
    cost: expenseTypeTotals[expenseType],
  }));
  const totalCost = chartData.reduce((total, entry) => total + entry.cost, 0);
  const incomeDifference = income - totalCost;

  // Final data
  const finalsSortedChartData = [
    ...sortedData,
    {
      name: "Leftover",
      cost: incomeDifference > 0 ? incomeDifference : 0,
    },
  ];
  const finalTotalsChartData = [
    ...chartData,
    {
      name: "Leftover",
      cost: incomeDifference > 0 ? incomeDifference : 0,
    },
  ];

  return isHidden ? (
    <div className="flex justify-center items-center">
      <span className="text-lg text-gray-50">Enter data to see chart.</span>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col gap-2 h-full">
      <div className="min-h-80 min-w-80 h-80 w-80 bg-gray-900 m-3 rounded-lg">
        <ResponsiveContainer>
          {!viewTotals ? (
            <PieChart>
              <Pie
                data={finalsSortedChartData}
                dataKey="cost"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index: number) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColor(entry.expenseType)}
                    />
                  );
                })}
                <LabelList dataKey="name" position="outside" />
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          ) : (
            <PieChart>
              <Pie
                data={finalTotalsChartData}
                dataKey="cost"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
              >
                {chartData.map((entry, index: number) => {
                  return (
                    <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                  );
                })}
                <LabelList dataKey="name" position="outside" />
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold transition duration-150 ease-linear hover:bg-gray-300"
          onClick={() => setViewTotals(!viewTotals)}
        >
          {viewTotals ? "Hide Totals" : "View Totals"}
        </button>
      </div>
    </div>
  );
};

export default memo(Chart);
