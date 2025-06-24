import { format } from "date-fns";

export const dateStringToDate = (dateString: string) => {
  return new Date(dateString);
};

export const dateToDateString = (date: Date) => {
  return date.toISOString();
};

export const dateInputStringToDate = (dateString: string) => {
  return new Date(dateString);
};

export const dateToDateInputString = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
