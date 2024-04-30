"use client";
import { useRef, useState } from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";

// Components
import { Chart, Table } from "@/components";

export default function Home() {
  const downloadRef = useRef<HTMLDivElement>(null);

  // TODO: The idea is to have an export button to download the graphic a user creates.
  const [view, setView] = useState<"paycheck" | "monthly">("paycheck");
  const [income, setIncome] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [expenseType, setExpenseType] = useState<any>("want");
  const [notes, setNotes] = useState<string>("");
  const [data, setData] = useState<Expense[]>([]);

  // Helpers
  const expenseTypes = ["want", "need", "save"];
  const leftover = income - data.reduce((acc, { cost }) => acc + cost, 0);

  const handleDownloadImage = async () => {
    const element = downloadRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50">
      <div className="h-32 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">Budget Helper</h1>
      </div>
      <div className="gap-2 flex border-b w-full justify-center border-gray-200">
        <button
          className={classNames(
            "border-t border-x px-4 py-2 bg-gray-200 transition duration-150 ease-linear hover:bg-gray-300",
            view === "paycheck" && "bg-gray-300"
          )}
          onClick={() => setView("paycheck")}
        >
          Paycheck Planner
        </button>
        <button
          className={classNames(
            "border-t border-x px-4 py-2 bg-gray-200 transition duration-150 ease-linear hover:bg-gray-300",
            view === "monthly" && "bg-gray-300"
          )}
          onClick={() => setView("monthly")}
        >
          Monthly Budget
        </button>
      </div>
      <div className="p-2">
        {view === "paycheck" ? (
          <section className="flex flex-col justify-center items-center gap-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-800">
              Paycheck Planner
            </h2>
            <div className="flex flex-col p-2 gap-2 justify-center items-center">
              <label className="text-lg font-semibold text-gray-700">
                Paycheck amount
              </label>
              <div className="w-full flex items-center gap-2">
                <span className="text-xl font-semibold text-gray-900">$</span>
                <input
                  className="border rounded-md p-2"
                  type="number"
                  value={income}
                  onChange={(evt) => setIncome(evt.target.valueAsNumber)}
                  placeholder="Paycheck amount"
                />
              </div>
              <div className="flex">
                <span
                  className={classNames(
                    leftover < 0 ? "text-red-900" : "text-green-900"
                  )}
                >
                  Leftover:{" "}
                  {leftover < 0 ? `-$${Math.abs(leftover)}` : `$${leftover}`}
                </span>
              </div>
            </div>

            <div className="flex justify-center items-end gap-4 max-w-4xl border rounded-md px-6 py-4 bg-gray-200 border-gray-300">
              <div className="flex flex-col justify-center align-start">
                <label className="font-semibold text-lg text-gray-800">
                  Name
                </label>
                <input
                  className="border border-gray-300 rounded-md p-1"
                  type="text"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                />
              </div>
              <div className="flex flex-col justify-center align-start">
                <label className="font-semibold text-lg text-gray-800">
                  Cost
                </label>
                <input
                  className="border border-gray-300 rounded-md p-1"
                  type="number"
                  value={cost}
                  onChange={(evt) => setCost(evt.target.valueAsNumber)}
                />
              </div>
              <div className="flex flex-col justify-center align-start w-24">
                <label className="font-semibold text-lg text-gray-800">
                  Type
                </label>
                <select
                  className="border border-gray-300 rounded-md p-1"
                  onChange={(evt) => setExpenseType(evt.target.value)}
                  value={expenseType}
                >
                  {expenseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-center align-start">
                <label className="font-semibold text-lg text-gray-800">
                  Notes
                </label>
                <input
                  className="border border-gray-300 rounded-md p-1"
                  type="text"
                  value={notes}
                  onChange={(evt) => setNotes(evt.target.value)}
                />
              </div>
              <div className="self-end">
                <button
                  className="bg-gray-500 px-3 py-1 text-white rounded-md"
                  onClick={() => {
                    setData([
                      ...data,
                      {
                        id: uuidv4(),
                        expenseType,
                        notes,
                        cost,
                        name,
                      },
                    ]);
                    setName("");
                    setCost(0);
                    setExpenseType("want");
                    setNotes("");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div
              ref={downloadRef}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <Chart data={data} income={income} />
              <Table data={data} setData={setData} />
            </div>
            <button type="button" onClick={handleDownloadImage}>
              Download as Image
            </button>
          </section>
        ) : (
          <section>
            <h2>Monthly Budget</h2>
            <p>Coming soon...</p>
          </section>
        )}
      </div>
    </main>
  );
}
