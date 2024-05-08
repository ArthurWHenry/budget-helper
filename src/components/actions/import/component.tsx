import { ChangeEvent, memo } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

// Atoms
import { dataState } from "@/atoms";

// Helpers
import { getHeader } from "./helpers";

// Styles
import "./styles.css";

// Types
import { Expense } from "@/types";

const ImportAction: React.FC = () => {
  const setData: SetterOrUpdater<Expense[]> =
    useSetRecoilState<Expense[]>(dataState);

  // Hadnle CSV Import
  const handleCSVImport = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length === 0) {
      toast.error("Error reading file.");
      return;
    }
    Papa.parse(event.target.files[0], {
      complete: function (results) {
        if (results.data.length < 2) {
          toast.error("Invalid CSV file.");
          return;
        }

        try {
          const [headers, ...rows] = results.data as string[][];
          const processedHeaders = headers.map((header: string) => {
            const returnVal: string = getHeader(header);

            if (returnVal.length === 0) {
              throw new Error("Invalid header.");
            }
            return returnVal;
          });

          const data = rows.map((row: any) => {
            let rowData: { [key: string]: any } = {};
            row.forEach((item: any, index: number) => {
              rowData[processedHeaders[index]] = item;
            });
            return rowData;
          });

          // Adding UUID to each row
          const addUUID = data.map((item: any) => ({
            ...item,
            id: uuidv4(),
            cost: Number(item.cost),
          }));

          // Checking that data is valid.
          addUUID.every(({ name, cost, expenseType }: any) => {
            if (
              typeof name !== "string" ||
              typeof cost !== "number" ||
              typeof expenseType !== "string"
            ) {
              throw new Error("Invalid data.");
            }
          });

          setData(addUUID);
          toast.success("CSV file imported successfully.");
        } catch (error: Error | any) {
          toast.error(error.message || "Error importing CSV file.");
        }
      },
    });
  };

  return (
    <div className="flex">
      <input
        id="csv-import"
        type="file"
        accept=".csv"
        onChange={handleCSVImport}
        className="hidden"
      />
      <label
        className="import-action-button"
        htmlFor="csv-import"
        title="Import CSV file"
      >
        <ArrowDownTrayIcon className="button-icon" />
      </label>
    </div>
  );
};

export default memo(ImportAction);
