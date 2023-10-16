export interface IDesigningDate {
  "plannedDate": string | Date,
  "actualDate": string | Date
}

export interface IDesigningDone {
  "plannedDone": number,
  "actualDone": number,
  "state": number
}

export interface IDesigning {
  "id": number,
  "status": number,
  "projectStart": "2018-12-27",
  "projectEnd": "2026-12-25",
  "designAssignment": IDesigningDate,
  "technicalSolutions": IDesigningDate,
  "territoryLayoutDocs": IDesigningDate,
  "projectDocs": IDesigningDate,
  "workDocs": IDesigningDate,
  "projectDocsApproval": IDesigningDate,
  "additionToWork": IDesigningDate,
  "departmentalExpertise": IDesigningDate & { state: number },
  "stateEnvironmentalExpertise": IDesigningDate & { state: number },
  "mainStateExpertise": IDesigningDate & { state: number },
  "landManagement": IDesigningDone,
  "facilityEquipment": IDesigningDone,
  "customerDelivery": IDesigningDone,
  "construction": IDesigningDone,
  "contractorDelivery": IDesigningDone
}