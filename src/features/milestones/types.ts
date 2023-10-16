export interface IMilestoneEntry {
  "id": number,
  "orderDate": string | Date,
  "orderNumber": string,
  "defectType": number,
  "fixPlanned": string | Date,
  "fixActual": string | Date,
  "defectDescription": string,
  "annotations": string
}

export interface IMilestones {
  "id": number,
  "reportDate": string | Date,
  "status": number,
  "entries": IMilestoneEntry[]
}