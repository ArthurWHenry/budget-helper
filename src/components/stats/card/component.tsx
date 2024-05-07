import { memo } from "react";
import classNames from "classnames";

const StatCard: React.FC<StatCardProps> = ({ title, value }: StatCardProps) => {
  function statColor(value: number): string {
    if (value === 0) return "border-yellow-900 bg-yellow-50 text-yellow-900";
    if (value < 0) return "border-red-900 bg-red-50 text-red-900";
    if (value > 0) return "border-green-900 bg-green-50 text-green-900";
    return "border-gray-900 bg-gray-50 text-gray-900";
  }
  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center p-4 gap-2 w-full border-2 rounded-lg shadow-md",
        statColor(value)
      )}
    >
      <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
      <span className={classNames("text-3xl font-bold")}>
        {value < 0
          ? `-$${Math.abs(value).toLocaleString()}`
          : `$${value.toLocaleString()}`}
      </span>
    </div>
  );
};

export default memo(StatCard);
