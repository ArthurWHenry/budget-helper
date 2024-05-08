import { memo } from "react";
import { useRecoilValue } from "recoil";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import classNames from "classnames";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

// Atoms
import { dataState } from "@/atoms";

// Styles
import "./styles.css";

// Types
import { Expense } from "@/types";

const ExportAction: React.FC = () => {
  // State
  const data: Expense[] = useRecoilValue<Expense[]>(dataState);

  const handleCSVExport = () => {
    const csv = Papa.unparse(
      data.map(({ name, cost, expenseType }) => ({
        NAME: name,
        COST: cost,
        "EXPENSE TYPE": expenseType,
      }))
    );
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(csvData, "expenseData.csv");
  };

  return (
    <button
      className={classNames("export-action-button", {
        "transition duration-150 ease-linear hover:bg-gray-600 hover:text-gray-100":
          data.length > 0,
      })}
      disabled={data.length === 0}
      onClick={handleCSVExport}
      title="Export CSV file"
    >
      <ArrowUpTrayIcon className="button-icon" />
    </button>
  );
};

export default memo(ExportAction);
