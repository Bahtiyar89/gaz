export interface IPnrStatus {
  "status": number,
  "plannedDate": string | Date,
  "actualDate": string | Date
}

export interface IPnrDates {
  "planned": number,
  "actual": number
}

export interface IPnr {
  "id": number,
  "reportDate": string | Date,
  "status": number,
  "pnrIdle": IPnrStatus,
  "pnrLoad": IPnrStatus,
  "gasSupply": IPnrStatus,
  "technologicalEnvironment": IPnrStatus,
  "coldStart": IPnrStatus,
  "hotStart": IPnrStatus,
  "systems": {
    "smrFinished": number,
    "individualTests": number,
    "complexTesting": number,
    "pnrPresented": IPnrDates,
    "pnrAccepted": IPnrDates,
    "pnrOngoing": IPnrDates,
    "pnrFinished": IPnrDates
  },
  "acts": {
    "individualTests": IPnrDates,
    "complexTesting": IPnrDates
  },
  "keySystems": {
    "general": number,
    "pnrAccepted": number,
    "completedTests": number,
    "signedComplexTests": number,
    "signedIndividualTests": number
  }
}