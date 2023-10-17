const origin = "http://localhost:3000";
import {
  budget,
  supervision,
  overview,
  pspir,
  projects,
  pnr,
  pnrdefects,
  milestones,
  designing,
} from "../../../db.json";

export const getBudget = (endpoint: string) => budget[0];
export const getSupervision = (endpoint: string) => supervision[0];
export const getOverview = (endpoint: string) => overview[0];
export const getPspir = (endpoint: string) => pspir[0];
export const getProjects = (endpoint: string) => projects;
export const getPnr = (endpoint: string) => pnr[0];
export const getPnrdefects = (endpoint: string) => pnrdefects[0];
export const getMilestones = (endpoint: string) => milestones[0];
export const getDesigning = (endpoint: string) => designing[0];

export const getData = (endpoint: string) =>
  fetch(`${origin}/${endpoint}`).then((r) => r.json());

export const putData = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await fetch(`${origin}/${endpoint}`, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postData = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await fetch(`${origin}/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const patchData = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await fetch(`${origin}/${endpoint}`, {
    method: "PATCH",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
