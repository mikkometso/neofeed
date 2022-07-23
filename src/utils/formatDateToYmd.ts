export const formatDateToYmd: (date: string) => string | void = (
  date: string
) => {
  return date.split(".").reverse().join("-");
};
