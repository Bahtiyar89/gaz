import dayjs, {Dayjs} from "dayjs";

export function dateFormat(date: Dayjs | null) {
  if (date) return dayjs(date).format('YYYY-MM-DD');
  else return '2020-02-02';
}