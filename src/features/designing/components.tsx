import {ChangeEvent, ReactNode, useContext} from "react";
import {AppStore} from "~/common/stores";
import {proxy, useSnapshot} from "valtio";
import useSWR from "swr";
import {dateFormat, getData} from "~/common/utils";
import {devtools} from "valtio/utils";
import {IDesigning} from "./types";
import {Heading, StyledDatePicker} from "~/common/components";
import {Box, Chip, InputAdornment, LinearProgress, Paper, Stack, TextField, Typography} from "@mui/material";
import {DesigningContext} from "./utils";
import dayjs, {Dayjs} from "dayjs";
import {CustomChip} from "~/common/components/custom-chip";

function DesigningEntryDate(props: {
  title: string;
  startingDate: string | Date;
  endingDate: string | Date;
  plannedDate: string | Date;
  onPlannedChange: (date: Dayjs | null) => void;
  actualDate: string | Date;
  onActualChange: (date: Dayjs | null) => void;
  status?: ReactNode;
}) {
  const projectLength = dayjs(props.endingDate).diff(dayjs(props.startingDate))
  const plannedLength = dayjs(props.plannedDate).diff(dayjs(props.startingDate))
  const actualLength = dayjs(props.actualDate).diff(dayjs(props.startingDate))

  return <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={'1rem'}>
    <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
      <Typography>{props.title}</Typography>

      {props.status}
    </Stack>

    <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
      <StyledDatePicker
        value={props.plannedDate.toString()}
        onChange={props.onPlannedChange}
        label={'План'}
      />

      <StyledDatePicker
        value={props.actualDate.toString()}
        onChange={props.onActualChange}
        label={'Факт'}
      />
      <Box width={'10rem'}>
        <LinearProgress
          sx={{
            ".MuiLinearProgress-dashed": {
              animation: "none !important",
            }
          }}
          variant="buffer"
          value={plannedLength / projectLength * 100}
          valueBuffer={actualLength / projectLength * 100}/>
      </Box>
    </Stack>
  </Stack>
}

function DesigningEntryDone(props: {
  title: string;
  plannedDone: number;
  onPlannedChange: (event: ChangeEvent<HTMLInputElement>) => void;
  actualDone: number;
  onActualChange: (event: ChangeEvent<HTMLInputElement>) => void;
  status: ReactNode;
}) {
  return <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={'1rem'}>
    <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
      <Typography>{props.title}</Typography>

      {props.status}
    </Stack>

    <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
      <TextField
        type={"number"}
        variant="standard"
        label="Факт"
        value={props.actualDone}
        onChange={props.onActualChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">/ {props.plannedDone}</InputAdornment>
        }}
      />

      <TextField
        type={"number"}
        variant="standard"
        label="План"
        value={props.plannedDone}
        onChange={props.onPlannedChange}
      />

      <Box width={'10rem'}>
        <LinearProgress
          variant="determinate"
          value={props.actualDone / props.plannedDone * 100}
        />
      </Box>
    </Stack>
  </Stack>
}

export function DesigningPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `designing/${appSnap.projectId}`;
  const {data, error, isLoading} = useSWR<IDesigning>(endpoint, getData)
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'Designing State', enabled: true})
  const snap = useSnapshot(state)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <DesigningContext.Provider value={state}>
    <Stack p={'3rem'} spacing={'1.5rem'}>
      <Heading title={'Проектирование'} endpoint={endpoint} context={DesigningContext}
               status={<CustomChip
                 variants={["завершено", "в работе", "отставание", "приостановлено"]}
                 selected={snap.status}
                 state={state!}
               />}/>

      <Paper>
        <Stack p={'1rem'} spacing={'1rem'}>
          <DesigningEntryDate
            title={'Задание на проектирование'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.designAssignment.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.designAssignment.plannedDate = dateFormat(date);
            }}
            actualDate={snap.designAssignment.actualDate}
            onActualChange={(date) => {
              if (date) state!.designAssignment.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Основные технические решения'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.technicalSolutions.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.technicalSolutions.plannedDate = dateFormat(date);
            }}
            actualDate={snap.technicalSolutions.actualDate}
            onActualChange={(date) => {
              if (date) state!.technicalSolutions.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Документация на планировке территории'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.territoryLayoutDocs.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.territoryLayoutDocs.plannedDate = dateFormat(date);
            }}
            actualDate={snap.territoryLayoutDocs.actualDate}
            onActualChange={(date) => {
              if (date) state!.territoryLayoutDocs.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Проектная документация'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.projectDocs.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.projectDocs.plannedDate = dateFormat(date);
            }}
            actualDate={snap.projectDocs.actualDate}
            onActualChange={(date) => {
              if (date) state!.projectDocs.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Рабочая документация'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.workDocs.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.workDocs.plannedDate = dateFormat(date);
            }}
            actualDate={snap.workDocs.actualDate}
            onActualChange={(date) => {
              if (date) state!.workDocs.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Утверждение проектной документации'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.projectDocsApproval.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.projectDocsApproval.plannedDate = dateFormat(date);
            }}
            actualDate={snap.projectDocsApproval.actualDate}
            onActualChange={(date) => {
              if (date) state!.projectDocsApproval.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Дата включения в работу'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.additionToWork.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.additionToWork.plannedDate = dateFormat(date);
            }}
            actualDate={snap.additionToWork.actualDate}
            onActualChange={(date) => {
              if (date) state!.additionToWork.actualDate = dateFormat(date);
            }}
          />

          <DesigningEntryDate
            title={'Ведомственная экспертиза'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.departmentalExpertise.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.departmentalExpertise.plannedDate = dateFormat(date);
            }}
            actualDate={snap.departmentalExpertise.actualDate}
            onActualChange={(date) => {
              if (date) state!.departmentalExpertise.actualDate = dateFormat(date);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDate
            title={'Гос. экологическая экспертиза'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.stateEnvironmentalExpertise.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.stateEnvironmentalExpertise.plannedDate = dateFormat(date);
            }}
            actualDate={snap.stateEnvironmentalExpertise.actualDate}
            onActualChange={(date) => {
              if (date) state!.stateEnvironmentalExpertise.actualDate = dateFormat(date);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDate
            title={'Главгосэкспертиза'}
            startingDate={snap.projectStart}
            endingDate={snap.projectEnd}
            plannedDate={snap.mainStateExpertise.plannedDate}
            onPlannedChange={(date) => {
              if (date) state!.mainStateExpertise.plannedDate = dateFormat(date);
            }}
            actualDate={snap.mainStateExpertise.actualDate}
            onActualChange={(date) => {
              if (date) state!.mainStateExpertise.actualDate = dateFormat(date);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDone
            title={'Землеустроительные работы'}
            plannedDone={snap.landManagement.plannedDone}
            onPlannedChange={(event) => {
              state!.landManagement.plannedDone = parseFloat(event.target.value);
            }}
            actualDone={snap.landManagement.actualDone}
            onActualChange={(event) => {
              state!.landManagement.actualDone = parseFloat(event.target.value);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDone
            title={'Комплектация объекта'}
            plannedDone={snap.facilityEquipment.plannedDone}
            onPlannedChange={(event) => {
              state!.facilityEquipment.plannedDone = parseFloat(event.target.value);
            }}
            actualDone={snap.facilityEquipment.actualDone}
            onActualChange={(event) => {
              state!.facilityEquipment.actualDone = parseFloat(event.target.value);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDone
            title={'Поставка заказчика'}
            plannedDone={snap.customerDelivery.plannedDone}
            onPlannedChange={(event) => {
              state!.customerDelivery.plannedDone = parseFloat(event.target.value);
            }}
            actualDone={snap.customerDelivery.actualDone}
            onActualChange={(event) => {
              state!.customerDelivery.actualDone = parseFloat(event.target.value);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDone
            title={'Строительство'}
            plannedDone={snap.construction.plannedDone}
            onPlannedChange={(event) => {
              state!.construction.plannedDone = parseFloat(event.target.value);
            }}
            actualDone={snap.construction.actualDone}
            onActualChange={(event) => {
              state!.construction.actualDone = parseFloat(event.target.value);
            }}
            status={<Chip label="ок" color="success"/>}
          />

          <DesigningEntryDone
            title={'Поставка подрядчика'}
            plannedDone={snap.contractorDelivery.plannedDone}
            onPlannedChange={(event) => {
              state!.contractorDelivery.plannedDone = parseFloat(event.target.value);
            }}
            actualDone={snap.contractorDelivery.actualDone}
            onActualChange={(event) => {
              state!.contractorDelivery.actualDone = parseFloat(event.target.value);
            }}
            status={<Chip label="ок" color="success"/>}
          />
        </Stack>
      </Paper>
    </Stack>
  </DesigningContext.Provider>
}