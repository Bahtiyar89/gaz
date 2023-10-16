import useSWRMutation from 'swr/mutation';
import {Context, ReactNode, useContext} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {putData} from "~/common/utils";
import {snapshot} from "valtio";
import {Save} from "@mui/icons-material";

export function Heading(props: {
  endpoint: string;
  context: Context<any>;
  title: string;
  children?: ReactNode;
  status?: ReactNode;
}) {
  const state = useContext(props.context);
  // const snap = useSnapshot(state);
  const {trigger} = useSWRMutation(props.endpoint, putData, /* options */);

  return <Stack
    direction={"row"}
    justifyContent="space-between"
    alignItems="center"
  >
    <Stack direction={"row"} spacing={'2rem'} alignItems={'center'}>
      <Typography variant={"h4"}>{props.title}</Typography>

      {props.status}
    </Stack>
    {props.children}

    <Button
      onClick={() => {
        trigger(snapshot(state))
      }}
      variant="contained"
      startIcon={<Save/>}
    >
      Сохранить
    </Button>
  </Stack>
}