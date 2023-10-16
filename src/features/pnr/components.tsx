import {ChangeEvent, useContext} from "react";
import {AppStore} from "~/common/stores";
import {proxy, useSnapshot} from "valtio";
import useSWR from "swr";
import {dateFormat, getData} from "~/common/utils";
import {devtools} from "valtio/utils";
import {IPnr} from "./types";
import {Heading, StyledDatePicker, InputWithProgress} from "~/common/components";
import {Chip, InputAdornment, LinearProgress, Paper, Stack, TextField, Typography} from "@mui/material";
import {PnrContext} from "./utils";
import Box from "@mui/material/Box";
import {CustomChip} from "~/common/components/custom-chip";

function PnrIdle() {
  const state = useContext(PnrContext);
  const {pnrIdle} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
        <Typography variant={"h6"}>ПНР вхолостую</Typography>

        <Chip label={'ок'} color={"success"}/>
      </Stack>

      {/*<Stack direction={"row"} alignItems={"center"}>*/}
      <StyledDatePicker
        value={pnrIdle.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.pnrIdle.plannedDate = dateFormat(date);
        }}
        label={'План'}
      />

      <StyledDatePicker
        value={pnrIdle.actualDate.toString()}
        onChange={(date) => {
          if (date) state!.pnrIdle.actualDate = dateFormat(date);
        }}
        label={'Факт'}
      />
      {/*</Stack>*/}
    </Stack>
  </Paper>
}

function PnrLoad() {
  const state = useContext(PnrContext);
  const {pnrLoad} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
        <Typography variant={"h6"}>ПНР под нагрузкой</Typography>

        <Chip label={'ок'} color={"success"}/>
      </Stack>

      {/*<Stack direction={"row"} alignItems={"center"}>*/}
      <StyledDatePicker
        value={pnrLoad.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.pnrLoad.plannedDate = dateFormat(date);
        }}
        label={'План'}
      />

      <StyledDatePicker
        value={pnrLoad.actualDate.toString()}
        onChange={(date) => {
          if (date) state!.pnrLoad.actualDate = dateFormat(date);
        }}
        label={'Факт'}
      />
      {/*</Stack>*/}
    </Stack>
  </Paper>
}

function GasSupply() {
  const state = useContext(PnrContext);
  const {gasSupply} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
        <Typography variant={"h6"}>Подача газа</Typography>

        <Chip label={'ок'} color={"success"}/>
      </Stack>

      {/*<Stack direction={"row"} alignItems={"center"}>*/}
      <StyledDatePicker
        value={gasSupply.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.gasSupply.plannedDate = dateFormat(date);
        }}
        label={'План'}
      />

      <StyledDatePicker
        value={gasSupply.actualDate.toString()}
        onChange={(date) => {
          if (date) state!.gasSupply.actualDate = dateFormat(date);
        }}
        label={'Факт'}
      />
      {/*</Stack>*/}
    </Stack>
  </Paper>
}

function TechnologicalEnvironment() {
  const state = useContext(PnrContext);
  const {technologicalEnvironment} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
        <Typography variant={"h6"}>Подача технологической среды</Typography>

        <Chip label={'ок'} color={"success"}/>
      </Stack>

      {/*<Stack direction={"row"} alignItems={"center"}>*/}
      <StyledDatePicker
        value={technologicalEnvironment.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.technologicalEnvironment.plannedDate = dateFormat(date);
        }}
        label={'План'}
      />

      <StyledDatePicker
        value={technologicalEnvironment.actualDate.toString()}
        onChange={(date) => {
          if (date) state!.technologicalEnvironment.actualDate = dateFormat(date);
        }}
        label={'Факт'}
      />
      {/*</Stack>*/}
    </Stack>
  </Paper>
}

function ColdStart() {
  const state = useContext(PnrContext);
  const {coldStart} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
        <Typography variant={"h6"}>Холодный запуск</Typography>

        <Chip label={'ок'} color={"success"}/>
      </Stack>

      {/*<Stack direction={"row"} alignItems={"center"}>*/}
      <StyledDatePicker
        value={coldStart.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.coldStart.plannedDate = dateFormat(date);
        }}
        label={'План'}
      />

      <StyledDatePicker
        value={coldStart.actualDate.toString()}
        onChange={(date) => {
          if (date) state!.coldStart.actualDate = dateFormat(date);
        }}
        label={'Факт'}
      />
      {/*</Stack>*/}
    </Stack>
  </Paper>
}

function HotStart() {
  const state = useContext(PnrContext);
  const {hotStart} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
        <Typography variant={"h6"}>Горячий запуск</Typography>

        <Chip label={'ок'} color={"success"}/>
      </Stack>

      {/*<Stack direction={"row"} alignItems={"center"}>*/}
      <StyledDatePicker
        value={hotStart.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.hotStart.plannedDate = dateFormat(date);
        }}
        label={'План'}
      />

      <StyledDatePicker
        value={hotStart.actualDate.toString()}
        onChange={(date) => {
          if (date) state!.hotStart.actualDate = dateFormat(date);
        }}
        label={'Факт'}
      />
      {/*</Stack>*/}
    </Stack>
  </Paper>
}

function InputsWithProgress(props: {
  title: string;
  plannedValue: number;
  actualValue: number;
  onPlannedChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onActualChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return <Stack spacing={'0.5rem'}>
    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={'1rem'}>
      <Typography>{props.title}</Typography>

      <Box width={"5rem"}>
        <LinearProgress variant="determinate" value={props.actualValue / props.plannedValue * 100}/>
      </Box>
    </Stack>

    <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
      <TextField
        sx={{width: '11rem'}}
        type={"number"}
        variant="standard"
        label="Факт"
        value={props.actualValue}
        onChange={props.onActualChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">/ {props.plannedValue}</InputAdornment>
        }}
      />

      <TextField
        sx={{width: '8rem'}}
        type={"number"}
        variant="standard"
        label="План"
        value={props.plannedValue}
        onChange={props.onPlannedChange}
      />
    </Stack>
  </Stack>
}

function Systems() {
  const state = useContext(PnrContext);
  const {systems} = useSnapshot(state!);
  return <Paper>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Typography variant={"h6"}>Системы</Typography>

      <TextField
        type={"number"}
        variant="standard"
        label="СМР завершено"
        value={systems.smrFinished}
        onChange={(event) => {
          state!.systems.smrFinished = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Индивид. испытания'}
        total={systems.smrFinished}
        value={systems.individualTests}
        onChange={(event) => {
          state!.systems.individualTests = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Компл. опробование'}
        total={systems.smrFinished}
        value={systems.complexTesting}
        onChange={(event) => {
          state!.systems.complexTesting = parseInt(event.target.value);
        }}
      />

      <InputsWithProgress
        title={'Предъявлено в ПНР'}
        plannedValue={systems.pnrPresented.planned}
        onPlannedChange={(event) => (state!.systems.pnrPresented.planned = parseInt(event.target.value))}
        actualValue={systems.pnrPresented.actual}
        onActualChange={(event) => (state!.systems.pnrPresented.actual = parseInt(event.target.value))}
      />

      <InputsWithProgress
        title={'Принято в ПНР'}
        plannedValue={systems.pnrAccepted.planned}
        onPlannedChange={(event) => (state!.systems.pnrAccepted.planned = parseInt(event.target.value))}
        actualValue={systems.pnrAccepted.actual}
        onActualChange={(event) => (state!.systems.pnrAccepted.actual = parseInt(event.target.value))}
      />

      <InputsWithProgress
        title={'Ведутся ПНР'}
        plannedValue={systems.pnrOngoing.planned}
        onPlannedChange={(event) => (state!.systems.pnrOngoing.planned = parseInt(event.target.value))}
        actualValue={systems.pnrOngoing.actual}
        onActualChange={(event) => (state!.systems.pnrOngoing.actual = parseInt(event.target.value))}
      />

      <InputsWithProgress
        title={'Завершены ПНР'}
        plannedValue={systems.pnrFinished.planned}
        onPlannedChange={(event) => (state!.systems.pnrFinished.planned = parseInt(event.target.value))}
        actualValue={systems.pnrFinished.actual}
        onActualChange={(event) => (state!.systems.pnrFinished.actual = parseInt(event.target.value))}
      />
    </Stack>
  </Paper>
}

function Acts() {
  const state = useContext(PnrContext);
  const {acts} = useSnapshot(state!);
  return <Paper sx={{height: '100%'}}>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Typography variant={"h6"}>Акты</Typography>

      <InputsWithProgress
        title={'Индивидуальные испытания'}
        plannedValue={acts.individualTests.planned}
        onPlannedChange={(event) => (state!.acts.individualTests.planned = parseInt(event.target.value))}
        actualValue={acts.individualTests.actual}
        onActualChange={(event) => (state!.acts.individualTests.actual = parseInt(event.target.value))}
      />

      <InputsWithProgress
        title={'Комплексное опробование'}
        plannedValue={acts.complexTesting.planned}
        onPlannedChange={(event) => (state!.acts.complexTesting.planned = parseInt(event.target.value))}
        actualValue={acts.complexTesting.actual}
        onActualChange={(event) => (state!.acts.complexTesting.actual = parseInt(event.target.value))}
      />
    </Stack>
  </Paper>
}

function KeySystems() {
  const state = useContext(PnrContext);
  const {keySystems} = useSnapshot(state!);
  return <Paper sx={{height: '100%'}}>
    <Stack p={'1rem'} spacing={'1rem'}>
      <Typography variant={"h6"}>Ключевые системы</Typography>

      <TextField
        type={"number"}
        variant="standard"
        label="Общее"
        value={keySystems.general}
        onChange={(event) => {
          state!.keySystems.general = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Принято в ПНР'}
        total={keySystems.general}
        value={keySystems.pnrAccepted}
        onChange={(event) => {
          state!.keySystems.pnrAccepted = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Выполнено испытаний'}
        total={keySystems.general}
        value={keySystems.completedTests}
        onChange={(event) => {
          state!.keySystems.completedTests = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Подписано актов инд. испытаний'}
        total={keySystems.general}
        value={keySystems.signedIndividualTests}
        onChange={(event) => {
          state!.keySystems.signedIndividualTests = parseInt(event.target.value);
        }}
      />

      <InputWithProgress
        label={'Подписано актов компл. испытаний'}
        total={keySystems.general}
        value={keySystems.signedComplexTests}
        onChange={(event) => {
          state!.keySystems.signedComplexTests = parseInt(event.target.value);
        }}
      />
    </Stack>
  </Paper>
}

export function PnrPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `pnr/${appSnap.projectId}`;
  const {data, error, isLoading} = useSWR<IPnr>(endpoint, getData)
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'PNR State', enabled: true})
  const snap = useSnapshot(state)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <PnrContext.Provider value={state}>
    <Stack p={'3rem'} spacing={'1.5rem'}>
      <Heading title={'Пусконаладочные работы'} endpoint={endpoint} context={PnrContext}
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
        <PnrIdle/>

        <PnrLoad/>

        <GasSupply/>
      </Stack>

      <Stack direction={"row"} spacing={'2rem'}>
        <TechnologicalEnvironment/>

        <ColdStart/>

        <HotStart/>
      </Stack>

      <Stack direction={"row"} spacing={'2rem'}>
        <Systems/>

        <Acts/>

        <KeySystems/>
      </Stack>

    </Stack>
  </PnrContext.Provider>
}