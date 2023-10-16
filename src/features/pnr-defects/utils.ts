import {createContext} from "react";
import {IPnrDefects} from "~/features/pnr-defects/types";

export const PnrDefectsContext = createContext<null | IPnrDefects>(null)