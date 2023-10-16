export interface IPd {
  "planned": number,
  "actual": number,
  "approved": number
}

export interface ILandWorks {
  "amountTotal": number,
  "amountDate": number,
  "readyDate": number,
  "issuedDate": number
}

export interface IRd {
  "planned": number,
  "actual": number,
  "amountDate": number,
  "amountTotal": number,
  "developed": number,
  "inProgress": number,
  "changesDatePlanned": number,
  "changesDateActual": number,
  "changesIntoWork": number,
  "mtrEntries": number,
  "mtrEntriesChanges": number,
  "completedSets": number,
  "completedChanges": number,
  "accountedSets": number,
  "accountedChanges": number
}

export interface IPsPir {
  "id": number,
  "reportDate": string | Date,
  "status": number,
  "pd": IPd,
  "landWorks": ILandWorks,
  "rd": IRd
}