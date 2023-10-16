import {createContext} from "react";
import {IDesigning} from "./types";

export const DesigningContext = createContext<null | IDesigning>(null)