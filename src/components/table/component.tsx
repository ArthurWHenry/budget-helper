import { Dispatch, memo, SetStateAction, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Table = ({
  data,
  setData,
}: {
  data: Expense[];
  setData: Dispatch<SetStateAction<Expense[]>>;
}) => {
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
    columnHelper.accessor("notes", {
      header: "Notes",
    }),
    columnHelper.accessor("remove", {
      header: "",
      minSize: 100,
      cell: (context: any) => (
        <button
          className="px-2 rounded hover:bg-gray-300 duration-150 transition ease-linear bg-gray-200"
          onClick={() => removeEntry(context.row.original.id)}
        >
          -
        </button>
      ),
    }),
  ];

  // Define your remove entry function
  const removeEntry = (id: string) => {
    setData(data.filter((entry) => entry.id !== id));
  };

  const table = useReactTable({
    data: data as TableExpense[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 w-full">
      <table className="max-w-4xl mx-auto w-full">
        <thead className="bg-gray-900 border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border text-gray-50 uppercase max-w-56"
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
        <tbody className="border">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border h-10">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border bg-gray-50 text-center max-w-56"
                >
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
