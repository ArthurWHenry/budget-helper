// Helper function to generate an array of all dates between two dates
export const getDatesBetween = (start: Date, end: Date) => {
  const dates = [];
  let currentDate = start;

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
