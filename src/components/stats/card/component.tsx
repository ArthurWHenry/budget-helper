import { memo } from "react";
import classNames from "classnames";

// Helpers
import { statColor } from "./helpers";

// Styles
import "./styles.css";

// Types
import { StatCardProps } from "@/types";

const StatCard: React.FC<StatCardProps> = ({ title, value }: StatCardProps) => {
  // Helpers
  const isNegative = value < 0;
  const formattedValue = `$${Math.abs(value).toLocaleString()}`;
  const result = isNegative ? `-${formattedValue}` : formattedValue;

  return (
    <div className={classNames("stat-container", statColor(value))}>
      <h3 className="stat-title">{title}</h3>
      <span className="stat-value">{result}</span>
    </div>
  );
};

export default memo(StatCard);
