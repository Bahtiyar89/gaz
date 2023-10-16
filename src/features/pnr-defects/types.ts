export interface IPnrDefectsEntry {
  "id": number,
  "orderDate": string | Date,
  "orderNumber": string,
  "defectType": number,
  "fixPlanned": string | Date,
  "fixActual": string | Date,
  "defectDescription": string,
  "annotations": string
}

export interface IPnrDefects {
  "id": number,
  "reportDate": string | Date,
  "status": number,
  "entries": IPnrDefectsEntry[]
}