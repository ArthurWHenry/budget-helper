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
import { dataState } from "@/atoms";

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

  return isHidden ? (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Table);
