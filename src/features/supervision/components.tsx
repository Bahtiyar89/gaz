import { useContext } from "react";
import { AppStore } from "~/common/stores";
import { proxy, useSnapshot } from "valtio";
import useSWR from "swr";
import { dateFormat, getData } from "~/common/utils";
import { devtools } from "valtio/utils";
import { ISupervision } from "./types";
import { Heading, StyledDatePicker } from "~/common/components";
import { Button, Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { SupervisionContext } from "./utils";
import Box from "@mui/material/Box";
import { Add } from "@mui/icons-material";
import { CustomChip } from "~/common/components/custom-chip";
import { getSupervision } from "~/common/utils/rest-utils";

function SupervisionEntries() {
  const state = useContext(SupervisionContext);
  const snap = useSnapshot(state!);

  const cols: GridColDef[] = [
    {
      field: "status",
      headerName: "Статус",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label="норма" color="success" />
      ),
    },
    {
      field: "organisation",
      headerName: "Организация",
      width: 200,
      editable: true,
    },
    {
      field: "controlArea",
      headerName: "Область контроля",
      width: 200,
      editable: true,
    },
    { field: "plannedDate", headerName: "План", width: 200, editable: true },
    { field: "actualDate", headerName: "Факт", width: 200, editable: true },
    {
      field: "supervisorName",
      headerName: "ФИО супервайзера",
      width: 200,
      editable: true,
    },
    {
      field: "supervisorStatus",
      headerName: "Статус супервайзера",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label="норма" color="success" />
      ),
    },
    {
      field: "type",
      headerName: "Вид",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        const variants = ["Остановочное предписание", "Предписание"];
        return variants[params.value];
      },
    },
    {
      field: "documentNumber",
      headerName: "№ документа",
      width: 200,
      editable: true,
    },
    {
      field: "supervisionDate",
      headerName: "Дата",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Описание",
      width: 200,
      editable: true,
    },
    {
      field: "annotations",
      headerName: "Примечание",
      width: 200,
      editable: true,
    },
  ];

  return (
    <DataGrid
      editMode="row"
      autoHeight
      rows={state!.entries}
      columns={cols}
      // columnGroupingModel={columnGroups}
      // experimentalFeatures={{columnGrouping: true}}
    />
  );
}

export function SupervisionPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `supervision/${appSnap.projectId}`;
  const { data, error, isLoading } = useSWR<any>(endpoint, getSupervision);
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'Overview State', enabled: true})
  const snap = useSnapshot(state);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <SupervisionContext.Provider value={state}>
      <Stack p={"3rem"} spacing={"1.5rem"}>
        <Heading
          title={"Надзор"}
          endpoint={endpoint}
          context={SupervisionContext}
          status={
            <CustomChip
              variants={[
                "завершено",
                "в работе",
                "отставание",
                "приостановлено",
              ]}
              selected={snap.status}
              state={state!}
            />
          }
        >
          <StyledDatePicker
            label={"Дата отчета"}
            value={snap.reportDate.toString()}
            onChange={(date) => {
              if (date) state!.reportDate = dateFormat(date);
            }}
          />
        </Heading>

        <SupervisionEntries />

        <Box mt={"1rem"}>
          <Button variant="contained" startIcon={<Add />}>
            Добавить строку
          </Button>
        </Box>
      </Stack>
    </SupervisionContext.Provider>
  );
}
