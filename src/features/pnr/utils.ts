import {createContext} from "react";
import {IPnr} from "./types";

export const PnrContext = createContext<null | IPnr>(null)