interface IProject {
  "projectID": string;
  "projectTitle": string;
  "technicalSpecifications": string;
  "projectStart": string | Date;
  "projectEnd": string | Date;
  "region": string;
  "category": number;
  "investProgram": number;
  "projectCost": number;
  "contractualScheme": string;
}

interface IConstructionPermit {
  "status": number;
  "permitNumber": string;
  "plannedDate": string | Date;
  "receivedDate": string | Date;
}

interface IPower {
  "amount": number;
  "onFirstMonth": number;
  "onSecondMonth": number;
}

interface IGPR {
  "status": number;
  "identifier": string;
  "date": string | Date;
}

interface IReport {
  "status": number;
  "date": string | Date;
}

interface IMain {
  "project": IProject;
  "comment": string;
  "constructionPermit": IConstructionPermit;
  "power": IPower;
  "GPR": IGPR;
  "PNR": IGPR;
  "report644": IReport;
  "reportDepartment": IReport;
  "reportBuRg": IReport;
  launchPermission: number;
}

interface IResponsible {
  "id": 1;
  "type": string;
  "name": string;
  "status": number;
  "phone": string;
  "email": string;
}

interface INetworkSchedule {
  "enabled": boolean;
  "version": number;
  "identifier": string;
  "statusDate": string | Date;
  "reviewStatus": number;
  "responsible": IResponsible[];
}

interface IOrganisation {
  "id": number;
  "type": number;
  "title": string;
  "director": string;
  "address": string;
  "phone": string;
  "email": string;
  "email2": string;
  "statusContracts": number;
  "statusKsg": number;
  "statusVolume": number;
}

export interface IOverview {
  "main": IMain,
  "networkSchedule": INetworkSchedule,
  "organisations": IOrganisation[]
}