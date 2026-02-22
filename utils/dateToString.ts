import dayjs from "dayjs";

export function dateToString(date: Date) {
  return dayjs(date).format('YYYY-MM-DD');
}