import { memo } from "react";
import classNames from "classnames";

const StatCard: React.FC<StatCardProps> = ({ title, value }: StatCardProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-2 w-full bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-lg">{title}</h3>
      <span
        className={classNames(
          "text-2xl font-bold",
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
