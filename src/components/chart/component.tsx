import { memo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import classNames from "classnames";
import { ChartPieIcon as ChartPieIconSolid } from "@heroicons/react/24/solid";
import { ChartPieIcon as ChartPieIconOutline } from "@heroicons/react/24/outline";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Components
import { CustomLabel } from "./components";

// Helpers
import {
  getColor,
  getExpenseTypeTotals,
  getTotalsColor,
  sortDataByExpenseType,
} from "./helpers";

// Styles
import "./styles.css";

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

  return (
    <>
      <div className="chart-actions">
        <button
          className={classNames("chart-change-view-button", {
            "transition duration-150 ease-linear hover:bg-gray-600 hover:text-gray-100":
              data.length > 0,
          })}
          disabled={data.length === 0}
          onClick={() => setViewTotals(!viewTotals)}
          title="View Totals"
        >
          {viewTotals ? (
            <ChartPieIconSolid className="button-icon" />
          ) : (
            <ChartPieIconOutline className="button-icon" />
          )}
        </button>
      </div>
      {isHidden ? (
        <div className="no-data">
          <span>Enter data to see chart.</span>
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer
            height="100%"
            width="100%"
            className="chart-responsive-container"
          >
            <PieChart>
              <Pie
                data={viewTotals ? finalTotalsChartData : finalsSortedChartData}
                dataKey="cost"
                nameKey="name"
                fill="#8884d8"
                label={(data): JSX.Element => <CustomLabel {...data} />}
                labelLine={false}
              >
                {viewTotals
                  ? chartData.map((entry, index: number) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={getTotalsColor(entry.name)}
                        />
                      );
                    })
                  : data.map((_, index: number) => {
                      return (
                        <Cell key={`cell-${index}`} fill={getColor(index)} />
                      );
                    })}
              </Pie>
              <Tooltip
                content={({ active, payload }): JSX.Element | null => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="chart-custom-tooltip">
                        <p>
                          {`${
                            payload[0].name
                          } : $${payload[0].value?.toLocaleString()}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend iconSize={6} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default memo(Chart);
