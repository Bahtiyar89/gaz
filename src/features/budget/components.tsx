import { useContext } from "react";
import { AppStore } from "~/common/stores";
import { proxy, useSnapshot } from "valtio";
import useSWR from "swr";
import { dateFormat, getBudget, getData } from "~/common/utils";
import { devtools } from "valtio/utils";
import { IBudget } from "./types";
import { BudgetContext } from "~/features/budget/utils";
import { Heading, StyledDatePicker } from "~/common/components";
import { Button, Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Add } from "@mui/icons-material";
import { CustomChip } from "~/common/components/custom-chip";

function BudgetEntries() {
  const state = useContext(BudgetContext);
  const snap = useSnapshot(state!);

  const columnGroups = [
    {
      groupId: "ЛКВ",
      children: [
        { field: "lkvPlan1" },
        { field: "lkvPlan2" },
        { field: "lkvPlan3" },
        { field: "lkvActual" },
        { field: "lkvActualForecast" },
      ],
    },
    {
      groupId: "Конец периода",
      children: [{ field: "creditDebt" }, { field: "debitDebt" }],
    },
    {
      groupId: "Отчетный месяц",
      children: [{ field: "repayment" }, { field: "financingSum" }],
    },
    {
      groupId: "Авансирование",
      children: [
        { field: "currentYearProgram" },
        { field: "futureYearsProgram" },
      ],
    },
    {
      groupId: "Финансирование",
      children: [{ field: "financingPlan" }, { field: "financingActual" }],
    },
    {
      groupId: "Договорная стоимость ОКС",
      children: [
        { field: "oksGeneralContract" },
        { field: "oksDevelopment" },
        { field: "oksYear" },
      ],
    },
  ];

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
    { field: "title", headerName: "Название", width: 200, editable: true },
    {
      field: "tag",
      headerName: "Признак",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        const variants = ["ПД", "РД"];
        return variants[params.value];
      },
    },
    { field: "date", headerName: "Дата", width: 200, editable: true },
    { field: "lkvPlan1", headerName: "План №1", width: 200, editable: true },
    { field: "lkvPlan2", headerName: "План №2", width: 200, editable: true },
    { field: "lkvPlan3", headerName: "План №3", width: 200, editable: true },
    { field: "lkvActual", headerName: "Факт", width: 200, editable: true },
    {
      field: "lkvActualForecast",
      headerName: "Факт прогноз",
      width: 200,
      editable: true,
    },
    {
      field: "primaryPlan",
      headerName: "Основной план",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        const variants = ["План 1", "План 2", "План 3"];
        return variants[params.value];
      },
    },
    {
      field: "costItem",
      headerName: "Статья затрат",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        const variants = ["ПД", "РД", "ЗУР", "СМР", "ПНР", "ВВЭ"];
        return variants[params.value];
      },
    },
    {
      field: "creditDebt",
      headerName: "Кредиторская задолженность",
      width: 200,
      editable: true,
    },
    {
      field: "debitDebt",
      headerName: "Дебиторская задолженность",
      width: 200,
      editable: true,
    },
    {
      field: "repayment",
      headerName: "Погашение кредиторской",
      width: 200,
      editable: true,
    },
    {
      field: "financingSum",
      headerName: "Сумма финансирования",
      width: 200,
      editable: true,
    },
    {
      field: "currentYearProgram",
      headerName: "Программа текущего года",
      width: 200,
      editable: true,
    },
    {
      field: "futureYearsProgram",
      headerName: "Программа будущих лет",
      width: 200,
      editable: true,
    },
    { field: "financingPlan", headerName: "План", width: 200, editable: true },
    {
      field: "financingActual",
      headerName: "Факт",
      width: 200,
      editable: true,
    },
    { field: "oksYear", headerName: "Год", width: 200, editable: true },
    {
      field: "oksGeneralContract",
      headerName: "Генподряд",
      width: 200,
      editable: true,
    },
    {
      field: "oksDevelopment",
      headerName: "Освоение",
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
      columnGroupingModel={columnGroups}
      experimentalFeatures={{ columnGrouping: true }}
    />
  );
}

export function BudgetPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `budget/${appSnap.projectId}`;
  const { data, error, isLoading } = useSWR<any>(endpoint, getBudget);
  const state = proxy(data);
  // const unsub = devtools(state, {name: 'Overview State', enabled: true})
  const snap = useSnapshot(state);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <BudgetContext.Provider value={state}>
      <Stack p={"3rem"} spacing={"1.5rem"}>
        <Heading
          title={"Бюджет"}
          endpoint={endpoint}
          context={BudgetContext}
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
            label={"Дата статуса"}
            value={snap.reportDate.toString()}
            onChange={(date) => {
              if (date) state!.reportDate = dateFormat(date);
            }}
          />
        </Heading>

        <BudgetEntries />

        <Box mt={"1rem"}>
          <Button variant="contained" startIcon={<Add />}>
            Добавить строку
          </Button>
        </Box>
      </Stack>
    </BudgetContext.Provider>
  );
}
