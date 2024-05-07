export const statColor = (value: number): string => {
  if (value === 0) return "border-yellow-900 bg-yellow-50 text-yellow-900";
  if (value < 0) return "border-red-900 bg-red-50 text-red-900";
  if (value > 0) return "border-green-900 bg-green-50 text-green-900";
  return "border-gray-900 bg-gray-50 text-gray-900";
};
