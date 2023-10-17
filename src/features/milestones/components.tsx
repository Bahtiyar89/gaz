import { useContext } from "react";
import { AppStore } from "~/common/stores";
import { proxy, useSnapshot } from "valtio";
import useSWR from "swr";
import { dateFormat, getData } from "~/common/utils";
import { devtools } from "valtio/utils";
import { IMilestones } from "./types";
import { Heading, StyledDatePicker } from "~/common/components";
import { Button, Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { MilestonesContext } from "./utils";
import Box from "@mui/material/Box";
import { Add } from "@mui/icons-material";
import { CustomChip } from "~/common/components/custom-chip";
import { getMilestones } from "~/common/utils/rest-utils";

function MilestonesEntries() {
  const state = useContext(MilestonesContext);
  const snap = useSnapshot(state!);

  const cols: GridColDef[] = [
    { field: "identifier", headerName: "Код", width: 200, editable: true },
    {
      field: "status",
      headerName: "Статус",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label="норма" color="success" />
      ),
    },
    { field: "title", headerName: "Название", width: 200, editable: true },
    { field: "plannedDate", headerName: "План", width: 200, editable: true },
    { field: "actualDate", headerName: "Факт", width: 200, editable: true },
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

export function MilestonesPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `milestones/${appSnap.projectId}`;
  const { data, error, isLoading } = useSWR<any>(endpoint, getMilestones);
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'PNR Defects State', enabled: true})
  const snap = useSnapshot(state);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <MilestonesContext.Provider value={state}>
      <Stack p={"3rem"} spacing={"1.5rem"}>
        <Heading
          title={"Вехи"}
          endpoint={endpoint}
          context={MilestonesContext}
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

        <MilestonesEntries />

        <Box mt={"1rem"}>
          <Button variant="contained" startIcon={<Add />}>
            Добавить строку
          </Button>
        </Box>
      </Stack>
    </MilestonesContext.Provider>
  );
}
