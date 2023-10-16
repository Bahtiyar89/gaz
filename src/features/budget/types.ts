export interface IBudgetEntry {
  "id": number,
  "status": number,
  "title": string,
  "tag": number,
  "date": string | Date,
  "lkvPlan1": number,
  "lkvPlan2": number,
  "lkvPlan3": number,
  "lkvActual": number,
  "primaryPlan": number,
  "lkvActualForecast": number,
  "costItem": number,
  "creditDebt": number,
  "debitDebt": number,
  "repayment": number,
  "financingSum": number,
  "currentYearProgram": number,
  "futureYearsProgram": number,
  "financingPlan": number,
  "financingActual": number,
  "oksGeneralContract": number,
  "oksDevelopment": number,
  "oksYear": string | Date
}

export interface IBudget {
  "id": number,
  "status": number,
  "reportDate": string | Date,
  "entries": IBudgetEntry[]
}