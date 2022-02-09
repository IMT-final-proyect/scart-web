export interface IAddress {
   id: number;
   number: number;
   street: string;
   city: string;
   province: string;
   zip_code: string
}

export interface IContractor {
   id: number;
   name: string;
   cuit: string;
   address: IAddress
}

export interface IDriver {
   id: number;
   name: string;
   surname: string;
   cuit: string;
   birth_date: moment.Moment;
   contractor: {
      id: number;
      name: string;
      cuit: string;
   };
   address: IAddress
}

export interface IVehicle {
   id: number;
   plate: string;
   brand: string;
   model: string;
   year: number;
   contractor: {
      id: number;
      name: string;
      cuit: string;
   };
}

export interface ISecurity {
   id: number;
   name: string;
   surname: string;
   document: string;
}

export interface IDocument {
   id: number;
   entityId: number;
   entityType: number
   type: IDocumentType;
   state: number;
   expirationDate: moment.Moment;
   photos: string[];
   contractor?: IContractor;
}

export interface IDocumentType {
   id: number;
   name: string;
   appliesTo: number;
   severity: number;
}

export interface IException {
   id: number,
   driverId: number
   driver: string
   vehicleId: number
   vehicle: string
   securityId: number
   contractor: string
   state: number
}