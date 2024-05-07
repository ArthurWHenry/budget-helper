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

const Table = () => {
  // State
  const [data, setData] = useRecoilState<Expense[]>(dataState);

  // Helpers
  const columnHelper = createColumnHelper<TableExpense>();
  const isHidden = data.length < 1;

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
          className="px-2 rounded hover:bg-gray-300 duration-150 transition ease-linear bg-gray-200"
          onClick={() => removeEntry(context.row.original.id)}
        >
          -
        </button>
      ),
    }),
  ];

  // Handlers
  // Define your remove entry function
  const removeEntry = (id: string) => {
    setData(data.filter((entry): boolean => entry.id !== id));

    // Show success message
    toast.success("Expense removed successfully!");
  };

  const table = useReactTable({
    data: data as TableExpense[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return isHidden ? (
    <div className="flex justify-center items-center">
      <span className="text-lg text-gray-900">Enter data to see table.</span>
    </div>
  ) : (
    <div className="w-full bg-gray-50 shadow-md border border-gray-300">
      <table className="max-w-4xl mx-auto w-full">
        <thead className="h-10 border-b bg-gray-200 border-gray-300 shadow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray-900 border border-gray-300 uppercase"
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
            <tr key={row.id} className="h-10 border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center border">
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
