import { memo } from "react";
import { Sector } from "recharts";
import { useRecoilValue } from "recoil";

// State
import { incomeState } from "@/atoms";

const CustomLabel = (data: any) => {
  // Selectors
  const income: number = useRecoilValue(incomeState);

  // Helpers
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, value } = data;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={8}
        textAnchor={textAnchor}
        fill="#333"
      >
        {data.name} {income > 0 && `(${((value / income) * 100).toFixed(2)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={midAngle}
        endAngle={midAngle}
        fill={data.fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={data.fill}
        fill="none"
      />
    </g>
  );
};

export default memo(CustomLabel);
