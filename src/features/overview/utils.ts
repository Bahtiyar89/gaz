import {createContext} from "react";
import {IOverview} from "~/features/overview/types";

export const OverviewContext = createContext<null | IOverview>(null)