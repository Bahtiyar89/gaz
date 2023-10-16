import {createContext} from "react";
import {IBudget} from "~/features/budget/types";

export const BudgetContext = createContext<null | IBudget>(null)