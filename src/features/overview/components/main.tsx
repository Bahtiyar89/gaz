import {useContext} from "react";
import {OverviewContext} from "~/features/overview";
import {useSnapshot} from "valtio";
import {InputAdornment, ListSubheader, MenuItem, Paper, Stack, TextField, Typography} from "@mui/material";
import {StyledDatePicker} from "~/common/components";
import {dateFormat} from "~/common/utils";
import {CustomChip} from "~/common/components/custom-chip";

function Project() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack p={'1rem'} width={'24rem'} spacing={'1rem'}>
      <TextField
        variant="standard"
        label="Код проекта"
        value={main.project.projectID}
        onChange={(event) => {
          state!.main.project.projectID = event.target.value;
        }}
      />

      <TextField
        variant="standard"
        label="Наименование"
        value={main.project.projectTitle}
        onChange={(event) => {
          state!.main.project.projectTitle = event.target.value;
        }}
      />

      <TextField
        variant="standard"
        label="Тех. характеристика"
        value={main.project.technicalSpecifications}
        onChange={(event) => {
          state!.main.project.technicalSpecifications = event.target.value;
        }}
      />

      <Stack direction={"row"} spacing={'1rem'}>
        <StyledDatePicker
          value={main.project.projectStart.toString()}
          onChange={(date) => {
            if (date) state!.main.project.projectStart = dateFormat(date);
          }}
          label={'Начало'}
        />

        <StyledDatePicker
          value={main.project.projectEnd.toString()}
          onChange={(date) => {
            if (date) state!.main.project.projectEnd = dateFormat(date);
          }}
          label={'Окончание'}
        />
      </Stack>

      <TextField
        variant="standard"
        label="Регион"
        value={main.project.region}
        onChange={(event) => {
          state!.main.project.region = event.target.value;
        }}
      />

      <TextField
        select
        label="Категория"
        value={main.project.category}
        onChange={(event) => {
          state!.main.project.category = parseInt(event.target.value);
        }}
        variant="standard"
      >
        <MenuItem value={0}>Интегрированный проектный офис</MenuItem>
        <MenuItem value={1}>Осенне-зимний период</MenuItem>
        <MenuItem value={2}>Особый контроль</MenuItem>
        <MenuItem value={3}>Газификация, газоснабжение регионов</MenuItem>
      </TextField>

      <TextField
        select
        label="Инвестиционная программа"
        value={main.project.investProgram}
        onChange={(event) => {
          state!.main.project.investProgram = parseInt(event.target.value);
        }}
        variant="standard"
      >
        <ListSubheader>Приоритетные проекты</ListSubheader>
        <MenuItem value={0}>Проекты развития</MenuItem>
        <MenuItem value={1}>Обеспечение ПБ</MenuItem>
        <MenuItem value={2}>Вне подпрограммы</MenuItem>
        <ListSubheader>Проекты комплексных программ</ListSubheader>
        <MenuItem value={3}>Добыча и бурение на м.р.</MenuItem>
        <MenuItem value={4}>Транспорт</MenuItem>
        <MenuItem value={5}>Переработка</MenuItem>
        <MenuItem value={6}>Безопасность</MenuItem>
        <MenuItem value={7}>ГО и ЧС</MenuItem>
        <MenuItem value={8}>АСУ ТП</MenuItem>
        <MenuItem value={9}>Метрология</MenuItem>
        <MenuItem value={10}>Связь</MenuItem>
        <MenuItem value={11}>Вне подпрограммы</MenuItem>
        <ListSubheader>Прочие проекты</ListSubheader>
        <MenuItem value={12}>Инфраструктура и социальные проекты</MenuItem>
        <MenuItem value={13}>Стратегия информатизации</MenuItem>
        <MenuItem value={14}>Вне подпрограммы</MenuItem>
        <ListSubheader>Вне программы</ListSubheader>
        <MenuItem value={15}>Вне подпрограммы</MenuItem>
      </TextField>

      <TextField
        variant="standard"
        label="Стоимость"
        InputProps={{
          endAdornment: <InputAdornment position="end">млн руб.</InputAdornment>
        }}
        value={main.project.projectCost}
        onChange={(event) => {
          state!.main.project.projectCost = parseFloat(event.target.value);
        }}
      />

      <TextField
        variant="standard"
        label="Договорная схема"
        value={main.project.contractualScheme}
        onChange={(event) => {
          state!.main.project.contractualScheme = event.target.value;
        }}
      />
    </Stack>
  </Paper>
}

function ConstructionPermit() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems="center">
        <Typography>Разрешение на строительство</Typography>

        <CustomChip
          variants={["завершено", "в работе", "отставание", "приостановлено"]}
          selected={main.constructionPermit.status}
          state={state!.main.constructionPermit.status}
        />
      </Stack>

      <TextField
        variant="standard"
        label="Номер разрешения"
        value={main.constructionPermit.permitNumber}
        onChange={(event) => {
          state!.main.constructionPermit.permitNumber = event.target.value;
        }}
      />

      <StyledDatePicker
        value={main.constructionPermit.plannedDate.toString()}
        onChange={(date) => {
          if (date) state!.main.constructionPermit.plannedDate = dateFormat(date);
        }}
        label={'План дата'}
      />

      <StyledDatePicker
        value={main.constructionPermit.receivedDate.toString()}
        onChange={(date) => {
          if (date) state!.main.constructionPermit.receivedDate = dateFormat(date);
        }}
        label={'Дата получения'}
      />
    </Stack>
  </Paper>
}

function Power() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Typography>Мощность</Typography>

      <TextField
        type={"number"}
        variant="standard"
        label="Полная"
        value={main.power.amount}
        onChange={(event) => {
          state!.main.power.amount = parseFloat(event.target.value);
        }}
      />

      <TextField
        type={"number"}
        variant="standard"
        label="На 1-е число"
        value={main.power.onFirstMonth}
        onChange={(event) => {
          state!.main.power.onFirstMonth = parseFloat(event.target.value);
        }}
      />

      <TextField
        type={"number"}
        variant="standard"
        label="На 2-е число"
        value={main.power.onSecondMonth}
        onChange={(event) => {
          state!.main.power.onSecondMonth = parseFloat(event.target.value);
        }}
      />
    </Stack>
  </Paper>
}

function GPR() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems="center">
        <Typography>ГПР</Typography>

        <CustomChip
          variants={["ок", "в работе", "отставание", "приостановлено"]}
          selected={main.GPR.status}
          state={state!.main.GPR.status}
        />
      </Stack>

      <TextField
        variant="standard"
        label="Номер"
        value={main.GPR.identifier}
        onChange={(event) => {
          state!.main.GPR.identifier = event.target.value;
        }}
      />

      <StyledDatePicker
        value={main.GPR.date.toString()}
        onChange={(date) => {
          if (date) state!.main.GPR.date = dateFormat(date);
        }}
        label={'Дата'}
      />
    </Stack>
  </Paper>
}

function PNR() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems="center">
        <Typography>ПНР</Typography>

        <CustomChip
          variants={["ок", "в работе", "отставание", "приостановлено"]}
          selected={main.PNR.status}
          state={state!.main.PNR.status}
        />
      </Stack>

      <TextField
        variant="standard"
        label="Номер"
        value={main.PNR.identifier}
        onChange={(event) => {
          state!.main.PNR.identifier = event.target.value;
        }}
      />

      <StyledDatePicker
        value={main.PNR.date.toString()}
        onChange={(date) => {
          if (date) state!.main.PNR.date = dateFormat(date);
        }}
        label={'Дата'}
      />
    </Stack>
  </Paper>
}

function ReportDepartment() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems="center">
        <Typography>Отчет в департамент</Typography>

        <CustomChip
          variants={["ок", "в работе", "отставание", "приостановлено"]}
          selected={main.reportDepartment.status}
          state={state!.main.reportDepartment.status}
        />
      </Stack>

      <StyledDatePicker
        value={main.reportDepartment.date.toString()}
        onChange={(date) => {
          if (date) state!.main.reportDepartment.date = dateFormat(date);
        }}
        label={'Дата'}
      />
    </Stack>
  </Paper>
}

function ReportBuRg() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems="center">
        <Typography>Отчет в БУ и РГ</Typography>

        <CustomChip
          variants={["ок", "в работе", "отставание", "приостановлено"]}
          selected={main.reportBuRg.status}
          state={state!.main.reportBuRg.status}
        />
      </Stack>

      <StyledDatePicker
        value={main.reportBuRg.date.toString()}
        onChange={(date) => {
          if (date) state!.main.reportBuRg.date = dateFormat(date);
        }}
        label={'Дата'}
      />
    </Stack>
  </Paper>
}

function Report644() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)
  return <Paper>
    <Stack spacing={'1rem'} p={'1rem'}>
      <Stack direction={"row"} spacing={'1rem'} alignItems="center">
        <Typography>Отчет в 644</Typography>

        <CustomChip
          variants={["ок", "в работе", "отставание", "приостановлено"]}
          selected={main.report644.status}
          state={state!.main.report644.status}
        />
      </Stack>

      <StyledDatePicker
        value={main.report644.date.toString()}
        onChange={(date) => {
          if (date) state!.main.report644.date = dateFormat(date);
        }}
        label={'Дата'}
      />
    </Stack>
  </Paper>
}

export function Main() {
  const state = useContext(OverviewContext)
  const {main} = useSnapshot(state!)

  return <Stack direction={"row"} spacing={'2rem'}>
    <Stack spacing={'1rem'}>
      <Project/>

      <TextField
        // variant="standard"
        multiline
        rows={4}
        label="Комментарий"
        value={main.comment}
        onChange={(event) => {
          state!.main.comment = event.target.value;
        }}
      />
    </Stack>

    <Stack spacing={'2rem'}>
      <Stack direction={"row"} spacing={'2rem'}>
        <ConstructionPermit/>

        <Power/>
      </Stack>

      <Stack direction={"row"} spacing={'2rem'}>
        <GPR/>

        <PNR/>
      </Stack>

      <Stack direction={"row"} spacing={'2rem'}>
        <Report644/>

        <ReportDepartment/>

        <ReportBuRg/>
      </Stack>

      <TextField
        select
        label="Разрешение на ввод"
        value={main.launchPermission}
        onChange={(event) => {
          state!.main.launchPermission = parseInt(event.target.value);
        }}
        sx={{width: '20rem'}}
      >
        <MenuItem value={0}>Получено</MenuItem>
        <MenuItem value={1}>В процессе</MenuItem>
        <MenuItem value={2}>На удержании</MenuItem>
        <MenuItem value={3}>Отказано</MenuItem>
      </TextField>
    </Stack>
  </Stack>
}