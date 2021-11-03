export interface IAddress {
   id: number;
   number: number;
   street: string;
   city: string;
   province: string;
   zipcode: string
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
      id: string;
      name: string;
      cuit: string;
   };
}

export interface IVehicle {
   id: number;
   plate: string;
   brand: string;
   model: string;
   year: number;
   contractor: {
      id: string;
      name: string;
      cuit: string;
   };
}

export interface IDocument {
   id: number;
   entityId: number;
   entityType: number
   type: IDocumentType;
   state: number;
   expirationDate: moment.Moment;
   photos: string[];
}

export interface IDocumentType {
   id: number;
   name: string;
   appliesTo: number;
   severity: number;
}