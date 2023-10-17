import { useContext } from "react";
import { AppStore } from "~/common/stores";
import { proxy, useSnapshot } from "valtio";
import useSWR from "swr";
import { dateFormat, getData } from "~/common/utils";
import { devtools } from "valtio/utils";
import { IPnrDefects } from "./types";
import { Heading, StyledDatePicker } from "~/common/components";
import { Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { PnrDefectsContext } from "./utils";
import Box from "@mui/material/Box";
import { Add } from "@mui/icons-material";
import { CustomChip } from "~/common/components/custom-chip";
import { getPnrdefects } from "~/common/utils/rest-utils";

function PnrDefectsEntries() {
  const state = useContext(PnrDefectsContext);
  const snap = useSnapshot(state!);

  const cols: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Дата предписания",
      width: 200,
      editable: true,
    },
    {
      field: "orderNumber",
      headerName: "Номер предписания",
      width: 200,
      editable: true,
    },
    {
      field: "defectType",
      headerName: "Тип дефекта",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        const variants = ["Остановочное предписание", "Предписание"];
        return variants[params.value];
      },
    },
    {
      field: "fixPlanned",
      headerName: "Срок устранения план",
      width: 200,
      editable: true,
    },
    {
      field: "fixActual",
      headerName: "Срок устранения факт",
      width: 200,
      editable: true,
    },
    {
      field: "defectDescription",
      headerName: "Выявленные несоответствия",
      width: 200,
      editable: true,
    },
    {
      field: "annotations",
      headerName: "Примечания",
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

export function PnrDefectsPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `pnr-defects/${appSnap.projectId}`;
  const { data, error, isLoading } = useSWR<any>(endpoint, getPnrdefects);
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'PNR Defects State', enabled: true})
  const snap = useSnapshot(state);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <PnrDefectsContext.Provider value={state}>
      <Stack p={"3rem"} spacing={"1.5rem"}>
        <Heading
          title={"ПНР: Дефекты"}
          endpoint={endpoint}
          context={PnrDefectsContext}
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

        <PnrDefectsEntries />

        <Box mt={"1rem"}>
          <Button variant="contained" startIcon={<Add />}>
            Добавить строку
          </Button>
        </Box>
      </Stack>
    </PnrDefectsContext.Provider>
  );
}
