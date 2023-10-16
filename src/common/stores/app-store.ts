import {proxy} from "valtio";
import {createContext} from "react";

export const appState = proxy({
  projectId: 1,
  dataDrawerOpened: true,
})

export function changeDataDrawer() {
  appState.dataDrawerOpened = !appState.dataDrawerOpened
}
export const AppStore = createContext(appState);