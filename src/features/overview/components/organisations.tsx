import {Button, Chip, Stack, Typography} from "@mui/material";
import {useContext} from "react";
import {OverviewContext} from "~/features/overview";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {Add} from "@mui/icons-material";

function OrganisationsDataGrid() {
  const state = useContext(OverviewContext)

  const cols: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Тип',
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        const variants = ['Заказчик', "Партнер"];
        return variants[params.value]
      },
    },
    {field: 'title', headerName: 'Название', width: 200, editable: true},
    {field: 'director', headerName: 'Директор', width: 200, editable: true},
    {field: 'address', headerName: 'Адрес', width: 200, editable: true},
    {field: 'phone', headerName: 'Телефон', width: 200, editable: true},
    {field: 'email', headerName: 'EMail', width: 200, editable: true},
    {field: 'email2', headerName: 'EMail 2', width: 200, editable: true},
    {
      field: 'statusContracts',
      headerName: 'Договоры',
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label="норма" color="success"/>
      ),
    },
    {
      field: 'statusKsg',
      headerName: 'КСГ',
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label="норма" color="success"/>
      ),
    }, {
      field: 'statusVolume',
      headerName: 'Объем',
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label="норма" color="success"/>
      ),
    },
  ];

  // const processRowUpdate = useCallback(
  //   async (newRow: GridRowModel) => {
  //     // Make the HTTP request to save in the backend
  //     const response = await mutateRow(newRow);
  //
  //     return response;
  //   },
  //   [mutateRow],
  // );

  return <DataGrid editMode="row" autoHeight rows={state!.organisations} columns={cols}/>
}

export function Organisations() {
  return <Stack spacing={'1rem'} id={'organisations'}>
    <Typography variant={"h5"}>Организации</Typography>

    <OrganisationsDataGrid/>

    <Box mt={'1rem'}>
      <Button variant="contained" startIcon={<Add/>}>Добавить строку</Button>
    </Box>
  </Stack>
}