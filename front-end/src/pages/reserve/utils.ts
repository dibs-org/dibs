import { format, parse } from "date-fns";

export const dateStringToDate = (dateString: string) => {
  return parse(dateString, "yyyy-MM-dd", new Date());
};

export const dateToDateString = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
