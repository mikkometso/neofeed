export const addDaysToDate: (date: string, days: number) => string = (
  date: string,
  days: number
) => {
  let formatDate = date.split(".").reverse().join("-");
  const dateobj = new Date(formatDate);
  dateobj.setDate(dateobj.getDate() + days);
  return dateobj.toLocaleDateString().split("/").reverse().join("-");
};
