import { memo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// Atoms
import { dataState, incomeState, viewTotalsState } from "@/atoms";

// Components
import { ExportAction, ImportAction, ViewAction } from "@/components";
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
  // Selectors
  const data = useRecoilValue(dataState);
  const income = useRecoilValue(incomeState);
  const viewTotals: boolean = useRecoilValue<boolean>(viewTotalsState);

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
        <ExportAction />
        <ImportAction />
        <ViewAction />
      </div>
      {isHidden ? (
        <div className="no-data">
          <span>Enter data to see chart.</span>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <ResponsiveContainer
            height="100%"
            width="100%"
            className="overflow-visible"
            aspect={2}
          >
            <PieChart>
              <Pie
                data={viewTotals ? finalTotalsChartData : finalsSortedChartData}
                dataKey="cost"
                nameKey="name"
                fill="#8884d8"
                outerRadius="50%"
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default memo(Chart);
