export interface ISupervisionEntry {
  "id": number,
  "organisation": string,
  "controlArea": string,
  "plannedDate": string | Date,
  "actualDate": string | Date,
  "supervisorName": string,
  "supervisorStatus": number,
  "type": number,
  "documentNumber": string,
  "supervisionDate": string | Date,
  "description": string,
  "annotations": string
}

export interface ISupervision {
  "id": number,
  "reportDate": string | Date,
  "status": number,
  "entries": ISupervisionEntry[]
}