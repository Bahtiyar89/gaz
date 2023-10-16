import {createContext} from "react";
import {IPsPir} from "./types";

export const PsPirContext = createContext<null | IPsPir>(null)