import { memo } from "react";
import classNames from "classnames";

const StatCard: React.FC<StatCardProps> = ({ title, value }: StatCardProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center p-4 gap-2 w-full border-2 rounded-lg shadow-md",
        value < 0 ? "border-red-900 bg-red-50" : "border-green-900 bg-green-50"
      )}
    >
      <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
      <span
        className={classNames(
          "text-3xl font-bold",
          value < 0 ? "text-red-900" : "text-green-900"
        )}
      >
        {value < 0
          ? `-$${Math.abs(value).toLocaleString()}`
          : `$${value.toLocaleString()}`}
      </span>
    </div>
  );
};

export default memo(StatCard);
