import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";

// Atoms
import { dataState } from "@/atoms";

// Helpers
import { getHeader } from "./helpers";

// Styles
import "./styles.css";

// Types
import { Expense, TableExpense } from "@/types";

const Table = () => {
  // State
  const [data, setData] = useRecoilState<Expense[]>(dataState);

  // Helpers
  const columnHelper = createColumnHelper<TableExpense>();
  const columns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("cost", {
      header: () => "Cost",
      cell: (cost) => {
        const costValue = cost.getValue();
        return <span>${costValue.toLocaleString()}</span>;
      },
    }),
    columnHelper.accessor("expenseType", {
      header: () => <span>Type</span>,
    }),
    // columnHelper.accessor("notes", {
    //   header: "Notes",
    // }),
    columnHelper.accessor("remove", {
      header: "",
      cell: (context: any) => (
        <button
          className="table-row-cell-remove-button"
          onClick={() => removeEntry(context.row.original.id)}
        >
          -
        </button>
      ),
    }),
  ];
  const isHidden = data.length < 1;

  // Handlers
  // Handle CSV Export
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
            let rowData: { [key: string]: any } = {}; // Add type annotation for rowData
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

  // Remove entry
  const removeEntry = (id: string) => {
    setData(data.filter((entry): boolean => entry.id !== id));
    toast.success("Expense removed successfully!");
  };

  // Table setup
  const table = useReactTable({
    data: data as TableExpense[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {isHidden ? (
        <div className="no-data">
          <span>Enter data to see table.</span>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="table-head-cell">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="table-row">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-row-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="table-actions">
        <button
          className={classNames("table-export-button", {
            "transition duration-150 ease-linear hover:bg-gray-600 hover:text-gray-100":
              data.length > 0,
          })}
          disabled={data.length === 0}
          onClick={handleCSVExport}
        >
          <ArrowDownTrayIcon className="button-icon" />
        </button>
        <div className="flex">
          <input
            id="csv-import"
            type="file"
            accept=".csv"
            onChange={handleCSVImport}
            className="hidden"
          />
          <label
            className={classNames("table-import-button")}
            htmlFor="csv-import"
          >
            <ArrowUpTrayIcon className="button-icon" />
          </label>
        </div>
      </div>
    </>
  );
};

export default memo(Table);
