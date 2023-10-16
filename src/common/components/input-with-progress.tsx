import {ChangeEvent} from "react";
import {InputAdornment, LinearProgress, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";

export function InputWithProgress(props: { label: string, total: number, value: number, onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
    <TextField
      type={"number"}
      variant="standard"
      label={props.label}
      value={props.value}
      InputProps={{
        endAdornment: <InputAdornment position="end">/ {props.total}</InputAdornment>
      }}
      onChange={props.onChange}
    />
    <Box width={"5rem"}>
      <LinearProgress variant="determinate" value={props.value / props.total * 100}/>
    </Box>
  </Stack>;
}