import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import classNames from "classnames";
import { ChartPieIcon as ChartPieIconSolid } from "@heroicons/react/24/solid";
import { ChartPieIcon as ChartPieIconOutline } from "@heroicons/react/24/outline";

// Atoms
import { expensesDataState, viewTotalsState } from "@/atoms";

// Styles
import "./styles.css";

// Types
import { Expense } from "@/types";

const ViewAction: React.FC = () => {
  // State
  const [viewTotals, setViewTotals] = useRecoilState<boolean>(viewTotalsState);

  // Selectors
  const data: Expense[] = useRecoilValue(expensesDataState);

  return (
    <button
      className={classNames(
        "chart-change-view-action-button",
        {
          "transition duration-150 ease-linear hover:bg-gray-600 hover:text-gray-100":
            data.length > 0,
        },
        viewTotals
          ? "bg-gray-300 text-gray-500 shadow-none"
          : "bg-gray-500 text-gray-50 shadow"
      )}
      disabled={data.length === 0}
      onClick={() => setViewTotals(!viewTotals)}
      title="View Totals"
    >
      <ChartPieIconOutline className={classNames("button-icon")} />
    </button>
  );
};

export default memo(ViewAction);
