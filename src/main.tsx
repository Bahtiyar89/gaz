import React from 'react'
import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Root from './routes/root'
import DataPage from "./routes/data-page";
import MapPage from "./routes/map-page";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import '@fontsource/pt-sans/300.css';
import '@fontsource/pt-sans/400.css';
// import '@fontsource/pt-sans/500.css';
import '@fontsource/pt-sans/700.css';
import {ThemeProvider, useMediaQuery} from "@mui/material";
import {themeOptions} from "~/common/utils";
import {TimelineRoute} from "~/routes/timeline";
import {appState, AppStore} from "~/common/stores";
import {BranchRoute} from "~/routes/branch";
import DataPage2 from "~/routes/data-page-2";
import {OverviewPage} from "~/features/overview";
import {SupervisionPage} from "~/features/supervision";
import {PnrDefectsPage} from "~/features/pnr-defects";
import {PnrPage} from "~/features/pnr";
import {PsPirPage} from "~/features/ps-pir";
import {MilestonesPage} from "~/features/milestones";
import {DesigningPage} from "~/features/designing";
import {BudgetPage} from "~/features/budget";
console.log(useMediaQuery)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // loader: projectsLoader,
    children: [
      {
        index: true,
        element: <MapPage/>,
      },
      {
        path: "/data",
        element: <DataPage/>,
      },
      {
        path: "/data2",
        element: <DataPage2/>,
        children: [
          {
            index: true,
            element: <OverviewPage/>
          },
          {
            path: "/data2/budget",
            element: <BudgetPage/>
          },
          {
            path: "/data2/designing",
            element: <DesigningPage/>
          },
          {
            path: "/data2/milestones",
            element: <MilestonesPage/>
          },
          {
            path: "/data2/ps-pir",
            element: <PsPirPage/>
          },
          {
            path: "/data2/pnr",
            element: <PnrPage/>
          },
          {
            path: "/data2/pnr-defects",
            element: <PnrDefectsPage/>
          },
          {
            path: "/data2/supervision",
            element: <SupervisionPage/>
          },
        ]
      },
      // {
      //   path: "/planner",
      //   element: <TimelineRoute/>,
      // },
      {
        path: "/branch",
        element: <BranchRoute/>,
      },
    ],
  },
], {
  basename: '/',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
// ReactDOM.render(
  <React.StrictMode>
    <AppStore.Provider value={appState}>
      <ThemeProvider theme={themeOptions}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </AppStore.Provider>
  </React.StrictMode>,
)
