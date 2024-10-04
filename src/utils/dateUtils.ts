export const formatInputValue = (regExValue: string, maxYearLength: number) => {
  const day = regExValue.substring(0, 2);
  const month = regExValue.substring(2, 4);
  const year = regExValue.substring(4, 4 + maxYearLength);
  return { day, month, year };
};

export const createValidatedDate = (
  year: string,
  month: string,
  day: string,
) => {
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export const validateMonth = (month: string, countMonths: number) => {
  const monthNum = parseInt(month);
  return monthNum > countMonths ? `${countMonths}` : month;
};

export const validateDay = (day: string, month: string) => {
  if (!day || !month) return day;
  const maxDays = new Date(
    new Date().getFullYear(),
    parseInt(month),
    0,
  ).getDate();
  return parseInt(day) > maxDays ? `${maxDays}` : day;
};
