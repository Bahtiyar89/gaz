import { Stack } from "@mui/material";
import useSWR from "swr";
import { getData } from "~/common/utils";
import { proxy, useSnapshot } from "valtio";
import { useContext } from "react";
import { AppStore } from "~/common/stores";
import { OverviewContext } from "../utils";
import { IOverview } from "../types";
import { KSG } from "./ksg";
import { Main } from "./main";
import { Heading } from "~/common/components/heading";
import { devtools } from "valtio/utils";
import { Organisations } from "~/features/overview";
import { getOverview } from "~/common/utils/rest-utils";

export function OverviewPage() {
  const appState = useContext(AppStore);
  const appSnap = useSnapshot(appState);
  const endpoint = `overview/${appSnap.projectId}`;
  const { data, error, isLoading } = useSWR<any>(endpoint, getOverview);
  const state = proxy(data);
  // const unsub = devtools(state, { name: 'Overview State', enabled: true })

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data)
    return (
      <OverviewContext.Provider value={state}>
        <Stack m={"3rem"} spacing={"1.5rem"}>
          <Heading
            title={"Обзор"}
            endpoint={endpoint}
            context={OverviewContext}
          />

          <Main />

          <KSG />

          <Organisations />
        </Stack>
      </OverviewContext.Provider>
    );
  else return null;
}
