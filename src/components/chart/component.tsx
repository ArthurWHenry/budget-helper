import { memo, use, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

// Atoms
import { dataState, incomeState } from "@/atoms";

// Helpers
import {
  getColor,
  getExpenseTypeTotals,
  getTotalsColor,
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
      <span className="text-lg text-gray-900">Enter data to see chart.</span>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col gap-2">
      <ResponsiveContainer
        height="100%"
        width="100%"
        className="w-full h-80 min-h-80"
      >
        {!viewTotals ? (
          <PieChart>
            <Pie
              data={finalsSortedChartData}
              dataKey="cost"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              labelLine={false}
              label={(data): JSX.Element => {
                const RADIAN = Math.PI / 180;
                // const radius = 80 + 30; // radius of outer circle
                const { cx, cy, midAngle, innerRadius, outerRadius, value } =
                  data;
                const sin = Math.sin(-RADIAN * midAngle);
                const cos = Math.cos(-RADIAN * midAngle);
                const sx = cx + (outerRadius + 10) * cos;
                const sy = cy + (outerRadius + 10) * sin;
                const mx = cx + (outerRadius + 30) * cos;
                const my = cy + (outerRadius + 30) * sin;
                const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                const ey = my;
                const textAnchor = cos >= 0 ? "start" : "end";

                return (
                  <g>
                    <text
                      x={ex + (cos >= 0 ? 1 : -1) * 12}
                      y={ey}
                      dy={8}
                      textAnchor={textAnchor}
                      fill="#333"
                    >{`${data.name} (${((value / income) * 100).toFixed(
                      2
                    )}%)`}</text>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius}
                      startAngle={midAngle}
                      endAngle={midAngle}
                      fill={data.fill}
                    />
                    <path
                      d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                      stroke={data.fill}
                      fill="none"
                    />
                  </g>
                );
              }}
            >
              {data.map((entry, index: number) => {
                return <Cell key={`cell-${index}`} fill={getColor(index)} />;
              })}
            </Pie>
            <Tooltip
              content={({ active, payload, label }): JSX.Element | null => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-50 rounded-lg shadow p-2 border">
                      <p className="label">{`${
                        payload[0].name
                      } : $${payload[0].value?.toLocaleString()}`}</p>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Legend iconSize={6} iconType="circle" />
          </PieChart>
        ) : (
          <PieChart>
            <Pie
              data={finalTotalsChartData}
              dataKey="cost"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label={(data): JSX.Element => {
                const RADIAN = Math.PI / 180;
                // const radius = 80 + 30; // radius of outer circle
                const { cx, cy, midAngle, innerRadius, outerRadius, value } =
                  data;
                const sin = Math.sin(-RADIAN * midAngle);
                const cos = Math.cos(-RADIAN * midAngle);
                const sx = cx + (outerRadius + 10) * cos;
                const sy = cy + (outerRadius + 10) * sin;
                const mx = cx + (outerRadius + 30) * cos;
                const my = cy + (outerRadius + 30) * sin;
                const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                const ey = my;
                const textAnchor = cos >= 0 ? "start" : "end";

                return (
                  <g>
                    <text
                      x={ex + (cos >= 0 ? 1 : -1) * 12}
                      y={ey}
                      dy={8}
                      textAnchor={textAnchor}
                      fill="#333"
                    >{`${data.name} (${((value / income) * 100).toFixed(
                      2
                    )}%)`}</text>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius}
                      startAngle={midAngle}
                      endAngle={midAngle}
                      fill={data.fill}
                    />
                    <path
                      d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                      stroke={data.fill}
                      fill="none"
                    />
                  </g>
                );
              }}
            >
              {chartData.map((entry, index: number) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={getTotalsColor(entry.name)}
                  />
                );
              })}
            </Pie>
            <Tooltip
              content={({ active, payload, label }): JSX.Element | null => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-50 rounded-lg shadow p-2 border">
                      <p className="label">{`${
                        payload[0].name
                      } : $${payload[0].value?.toLocaleString()}`}</p>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Legend iconSize={6} iconType="circle" />
          </PieChart>
        )}
      </ResponsiveContainer>
      <div className="flex justify-center items-center">
        <button
          className="bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold transition duration-150 ease-linear hover:bg-gray-300"
          onClick={() => setViewTotals(!viewTotals)}
        >
          {viewTotals ? "Hide Totals" : "View Totals"}
        </button>
      </div>
      {/* Add a color picker for users to use to help decorate their chart. */}
    </div>
  );
};

export default memo(Chart);
