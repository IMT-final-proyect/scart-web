export interface IDriver {
   id: number;
   name: string;
   surname: string;
   cuit: string;
   birth_date: moment.Moment;
}

export interface IVehicle {
   id: number;
   plate: string;
   brand: string;
   model: string;
   year: number;
}

export interface IDocument {
   id: number;
   name: string;
   entityId: number;
   entityType: number
   type: number;
   state: number;
   expirationDate: moment.Moment;
}

export interface IDocumentType {
   id: number
   name: string
   appliesTo: number
   severity: string
}