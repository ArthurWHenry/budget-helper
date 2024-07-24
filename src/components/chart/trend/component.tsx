import { memo } from "react";
import { useRecoilValue } from "recoil";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Atoms
import { expensesDataState, incomeState } from "@/atoms";

// Helpers
import { getDatesBetween } from "./helpers";

// Styles
import "./styles.css";

// Types
import { Expense } from "@/types";

const TrendChart = () => {
  const data: Expense[] = useRecoilValue(expensesDataState);
  const income: number = useRecoilValue(incomeState);

  // If income hasn't been set yet
  if (income === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-80 w-full">
        <div className="no-data">
          <span>Set income to see trend.</span>
        </div>
      </div>
    );
  }

  // If there's no data
  if (data.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center h-80 w-full">
        <div className="no-data">
          <span>Import or add data to see income trend.</span>
        </div>
      </div>
    );
  }

  // Get all dates between the earliest and latest dates in the data
  const allDates = getDatesBetween(
    new Date(data[0].date),
    new Date(data[data.length - 1].date)
  );

  // Formats data for the chart
  const formattedData = allDates.reduce((acc, date) => {
    const formattedDate = date.toLocaleDateString();

    const existingEntry = data.find(
      (entry) => new Date(entry.date).toLocaleDateString() === formattedDate
    );

    if (existingEntry) {
      acc.push({ date: formattedDate, cost: existingEntry.cost });
    } else {
      acc.push({ date: formattedDate, cost: 0 });
    }

    return acc;
  }, [] as { date: string; cost: number }[]);

  // Adjusts the income for the chart
  let incomeForEdit = income;
  const incomeAdjustedData = formattedData.map((entry) => {
    incomeForEdit -= entry.cost;
    return {
      ...entry,
      cost: incomeForEdit,
    };
  });

  return (
    <div data-cy="trend-chart" className="trend-chart-container">
      <h2 className="font-semibold text-lg text-gray-900">Income Trend</h2>
      <ResponsiveContainer
        height="100%"
        width="100%"
        className="overflow-visible"
      >
        <LineChart
          title="Income Trend"
          data={incomeAdjustedData}
          width={500}
          height={500}
          margin={{ right: 50 }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            allowDataOverflow={false}
          />
          <YAxis
            dataKey="cost"
            tickLine={false}
            axisLine={false}
            domain={[0, income]}
            padding={{ bottom: 25 }}
            scale="linear"
          />
          <Line
            type="monotone"
            dataKey="cost"
            stroke="#1f77b4"
            dot={false}
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }): JSX.Element | null => {
              if (active && payload && payload.length) {
                const date = payload[0].payload.date;

                return (
                  <div className="chart-custom-tooltip">
                    <p className="font-semibold text-gray-700 text-sm">
                      {date}
                    </p>
                    <p>{`Leftover: $${payload[0].value?.toLocaleString()}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(TrendChart);
