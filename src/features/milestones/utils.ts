import {createContext} from "react";
import {IMilestones} from "~/features/milestones/types";

export const MilestonesContext = createContext<null | IMilestones>(null)