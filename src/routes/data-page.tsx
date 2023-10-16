import {Accordion, AccordionDetails, AccordionSummary, Stack, Typography} from "@mui/material";

import {LocalizationProvider} from "@mui/x-date-pickers";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ru';
import {OverviewPage} from "~/features/overview";
import {BudgetPage} from "~/features/budget";
import {ReactNode} from "react";
import {ExpandMore} from "@mui/icons-material";
import {SupervisionPage} from "~/features/supervision";
import {PnrPage} from "~/features/pnr";
import {PnrDefectsPage} from "~/features/pnr-defects";
import {MilestonesPage} from "~/features/milestones";
import {PsPirPage} from "~/features/ps-pir";
import {DesigningPage} from "~/features/designing";
import CssBaseline from "@mui/material/CssBaseline";

// import ru from 'date-fns/locale/ru';

function CustomAccordion(props: { children: ReactNode; title: string; }) {
  return <Accordion
    TransitionProps={{ unmountOnExit: true }}
  >
    <AccordionSummary
      expandIcon={<ExpandMore/>}
      // aria-controls="panel1a-content"
      // id="panel1a-header"
    >
      <Typography>{props.title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {props.children}
    </AccordionDetails>
  </Accordion>
}

export default function DataPage() {
  //
  return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
    <CssBaseline />
    <Stack p={'2rem'}>
      <CustomAccordion title={"Обзор"}>
        <OverviewPage/>
      </CustomAccordion>

      <CustomAccordion title={"Бюджет"}>
        <BudgetPage/>
      </CustomAccordion>

      <CustomAccordion title={"Проектирование"}>
        <DesigningPage/>
      </CustomAccordion>

      <CustomAccordion title={"Вехи"}>
        <MilestonesPage/>
      </CustomAccordion>

      <CustomAccordion title={"ПС ПИР"}>
        <PsPirPage/>
      </CustomAccordion>

      <CustomAccordion title={"ПНР"}>
        <PnrPage/>
      </CustomAccordion>

      <CustomAccordion title={"ПНР: Дефекты"}>
        <PnrDefectsPage/>
      </CustomAccordion>

      <CustomAccordion title={"Надзор"}>
        <SupervisionPage/>
      </CustomAccordion>
    </Stack>
  </LocalizationProvider>
}