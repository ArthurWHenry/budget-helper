import { memo } from "react";
import { useRecoilState } from "recoil";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast from "react-hot-toast";

// Atoms
import { expensesDataState } from "@/atoms";

// Components
import { ClearAction, ExportAction, ImportAction } from "@/components";

// Styles
import "./styles.css";

// Types
import { Expense, TableExpense } from "@/types";

const ExpensesTable = () => {
  // State
  const [data, setData] = useRecoilState<Expense[]>(expensesDataState);

  // Helpers
  const columnHelper = createColumnHelper<TableExpense>();
  const columns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
      // size: 100,
    }),
    columnHelper.accessor("cost", {
      header: () => "Cost",
      cell: (cost) => {
        const costValue = cost.getValue();
        return <span>${costValue.toLocaleString()}</span>;
      },
      size: 50,
      maxSize: 75,
    }),
    columnHelper.accessor("expenseType", {
      header: () => <span>Type</span>,
      size: 50,
    }),
    columnHelper.accessor("date", {
      header: () => <span>Date</span>,
      cell: (date) => {
        return <span>{new Date(date.getValue()).toLocaleDateString()}</span>;
      },
      size: 50,
      maxSize: 50,
    }),
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
      size: 15,
    }),
  ];
  const isHidden = data.length < 1;

  // Handlers
  // Remove entry
  const removeEntry = (id: string) => {
    setData(data.filter((entry): boolean => entry.id !== id));
    toast.success("Expense removed successfully!");
  };

  // Table setup
  const table = useReactTable({
    data: data as unknown as TableExpense[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div data-cy="table-actions" className="table-actions">
        <ExportAction />
        <ImportAction />
        <ClearAction />
      </div>
      {isHidden ? (
        <div data-cy="no-data" className="no-data">
          <span>Import or add data to see the table.</span>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="table-head-cell"
                      style={{
                        width: header.column.getSize(),
                      }}
                    >
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
    </>
  );
};

export default memo(ExpensesTable);
