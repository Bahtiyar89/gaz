import {createContext} from "react";
import {ISupervision} from "~/features/supervision/types";

export const SupervisionContext = createContext<null | ISupervision>(null)