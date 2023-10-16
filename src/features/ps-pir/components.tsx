import {useContext} from "react";
import {AppStore} from "~/common/stores";
import {proxy, useSnapshot} from "valtio";
import useSWR from "swr";
import {dateFormat, getData} from "~/common/utils";
import {devtools} from "valtio/utils";
import {IPsPir} from "./types";
import {Heading, InputWithProgress, StyledDatePicker} from "~/common/components";
import {Chip, Paper, Stack, TextField, Typography} from "@mui/material";
import {PsPirContext} from "./utils";
import {CustomChip} from "~/common/components/custom-chip";

function RD() {
  const state = useContext(PsPirContext);
  const {rd} = useSnapshot(state!);
  return <Paper sx={{height: '100%'}}>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems={"center"}>
        <Typography variant={"h6"}>РД</Typography>

        <Chip label="ок" color="success"/>
      </Stack>

      <TextField
        type={"number"}
        variant="standard"
        label="Общее"
        value={rd.planned}
        onChange={(event) => {
          state!.rd.planned = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Принято в ПНР'}
        total={rd.planned}
        value={rd.actual}
        onChange={(event) => {
          state!.rd.actual = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.amountDate}
        onChange={(event) => {
          state!.rd.amountDate = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.amountTotal}
        onChange={(event) => {
          state!.rd.amountTotal = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.developed}
        onChange={(event) => {
          state!.rd.developed = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.inProgress}
        onChange={(event) => {
          state!.rd.inProgress = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.changesDatePlanned}
        onChange={(event) => {
          state!.rd.changesDatePlanned = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.changesDateActual}
        onChange={(event) => {
          state!.rd.changesDateActual = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.changesIntoWork}
        onChange={(event) => {
          state!.rd.changesIntoWork = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.mtrEntries}
        onChange={(event) => {
          state!.rd.mtrEntries = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.mtrEntriesChanges}
        onChange={(event) => {
          state!.rd.mtrEntriesChanges = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.completedSets}
        onChange={(event) => {
          state!.rd.completedSets = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.completedChanges}
        onChange={(event) => {
          state!.rd.completedChanges = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.accountedSets}
        onChange={(event) => {
          state!.rd.accountedSets = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={rd.planned}
        value={rd.accountedChanges}
        onChange={(event) => {
          state!.rd.accountedChanges = parseInt(event.target.value);
        }}
      />
    </Stack>
  </Paper>
}

function LandWorks() {
  const state = useContext(PsPirContext);
  const {landWorks} = useSnapshot(state!);
  return <Paper
    // sx={{height: '100%'}}
  >
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems={"center"}>
        <Typography variant={"h6"}>Землеустроительные работы</Typography>

        <Chip label="ок" color="success"/>
      </Stack>

      <TextField
        type={"number"}
        variant="standard"
        label="Кол-во всего"
        value={landWorks.amountTotal}
        onChange={(event) => {
          state!.landWorks.amountTotal = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Кол-во на дату, план'}
        total={landWorks.amountTotal}
        value={landWorks.amountDate}
        onChange={(event) => {
          state!.landWorks.amountDate = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Подготовлено на дату'}
        total={landWorks.amountTotal}
        value={landWorks.readyDate}
        onChange={(event) => {
          state!.landWorks.readyDate = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Оформлено на дату'}
        total={landWorks.amountTotal}
        value={landWorks.issuedDate}
        onChange={(event) => {
          state!.landWorks.issuedDate = parseInt(event.target.value);
        }}
      />
    </Stack>
  </Paper>
}

function PD() {
  const state = useContext(PsPirContext);
  const {pd} = useSnapshot(state!);
  return <Paper
    // sx={{height: '100%'}}
  >
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems={"center"}>
        <Typography variant={"h6"}>ПД</Typography>

        <Chip label="ок" color="success"/>
      </Stack>

      <TextField
        type={"number"}
        variant="standard"
        label="План"
        value={pd.planned}
        onChange={(event) => {
          state!.pd.planned = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Факт'}
        total={pd.planned}
        value={pd.actual}
        onChange={(event) => {
          state!.pd.actual = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Утверждено'}
        total={pd.planned}
        value={pd.approved}
        onChange={(event) => {
          state!.pd.approved = parseInt(event.target.value);
        }}
      />
    </Stack>
  </Paper>
}

export function PsPirPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `ps-pir/${appSnap.projectId}`;
  const {data, error, isLoading} = useSWR<IPsPir>(endpoint, getData)
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'PS PIR State', enabled: true})
  const snap = useSnapshot(state)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <PsPirContext.Provider value={state}>
    <Stack p={'3rem'} spacing={'1.5rem'}>
      <Heading title={'ПС ПИР'} endpoint={endpoint} context={PsPirContext}
               status={<CustomChip
                 variants={["завершено", "в работе", "отставание", "приостановлено"]}
                 selected={snap.status}
                 state={state!}
               />}>
        <StyledDatePicker
          label={'Дата отчета'}
          value={snap.reportDate.toString()}
          onChange={(date) => {
            if (date) state!.reportDate = dateFormat(date);
          }}
        />
      </Heading>

      <Stack direction={"row"} spacing={'2rem'}>
        <Stack spacing={'2rem'}>
          <PD/>

          <LandWorks/>
        </Stack>

        <RD/>
      </Stack>

    </Stack>
  </PsPirContext.Provider>
}