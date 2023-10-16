import {useContext} from "react";
import {OverviewContext} from "~/features/overview";
import {useSnapshot} from "valtio";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import {StyledDatePicker} from "~/common/components";
import {dateFormat} from "~/common/utils";
import {Add, ExpandMore} from "@mui/icons-material";
import Box from "@mui/material/Box";

function ResponsibleDataGrid() {
  const state = useContext(OverviewContext)

  const cols: GridColDef[] = [
    {field: 'type', headerName: 'Роль', width: 200, editable: true},
    {field: 'name', headerName: 'Имя', width: 200, editable: true},
    {
      field: 'status',
      headerName: 'Статус',
      width: 150,
      editable: true,
      renderCell: () => (
        <Chip label="норма" color="success"/>
      ),
    },
    {field: 'phone', headerName: 'Телефон', width: 150, editable: true},
    {field: 'email', headerName: 'Почта', width: 150, editable: true},
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

  return <DataGrid editMode="row" autoHeight rows={state!.networkSchedule.responsible} columns={cols}/>
}

export function KSG() {
  const state = useContext(OverviewContext)
  const {networkSchedule} = useSnapshot(state!)
  return <Stack spacing={'1rem'} id={'ksg'}>
    <Stack direction={"row"} spacing={'2rem'}>
      <Typography variant={'h5'}>Комплексный сетевой график</Typography>

      <Switch defaultChecked/>
    </Stack>

    <Paper>
      <Stack spacing={'1rem'}>
        <Stack direction={"row"} spacing={'1rem'} p={'1rem'}>
          <TextField
            variant="standard"
            label="Версия"
            value={networkSchedule.version}
            onChange={(event) => {
              state!.networkSchedule.version = parseInt(event.target.value);
            }}
          />

          <TextField
            variant="standard"
            label="Номер"
            value={networkSchedule.identifier}
            onChange={(event) => {
              state!.networkSchedule.identifier = event.target.value;
            }}
          />

          <StyledDatePicker
            label={'Дата статуса'}
            value={networkSchedule.statusDate.toString()}
            onChange={(date) => {
              if (date) state!.networkSchedule.statusDate = dateFormat(date);
            }}
          />

          <TextField
            sx={{width: '15rem'}}
            select
            label="Статус рассмотрения"
            value={networkSchedule.reviewStatus}
            onChange={(event) => {
              state!.networkSchedule.reviewStatus = parseInt(event.target.value);
            }}
            variant="standard"
          >
            <MenuItem value={0}>В разработке</MenuItem>
            <MenuItem value={1}>Готов</MenuItem>
          </TextField>
        </Stack>

        <Accordion sx={{boxShadow: 0}} defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMore/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ответственные</Typography>
          </AccordionSummary>

          <AccordionDetails>
              <ResponsibleDataGrid/>

              <Box mt={'1rem'}>
                <Button variant="contained" startIcon={<Add/>}>Добавить строку</Button>
              </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  </Stack>
}