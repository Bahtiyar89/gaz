export interface IProjectEntry {
  "id": number,
  "title": string,
  "lastEdit": string | Date
}

export interface IProjects {
  lastProject: number,
  entries: IProjectEntry[]
}