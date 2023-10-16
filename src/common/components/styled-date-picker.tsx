import {DatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";

export function StyledDatePicker(props: { value: string; onChange: (date: Dayjs | null) => void; label: string }) {
  return <DatePicker
    slots={{
      textField: TextField
    }}
    slotProps={{
      // pass props `actions={['clear']}` to the actionBar slot
      textField: {variant: 'standard'},
    }}
    label={props.label}
    value={dayjs(props.value)}
    onChange={props.onChange}
  />
}