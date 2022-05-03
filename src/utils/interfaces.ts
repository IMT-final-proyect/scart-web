import moment from "moment";

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
   address: IAddress;
   username: string;
   email: string;
}

export interface IDriver {
   id: number;
   name: string;
   surname: string;
   username: string;
   cuit: string;
   email: string;
   phone: string;
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
   type: {
      id: number;
      name: string;
   }
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
   comment: string | null,
   managerId: number | null,
   result: number | null,
   state: number,
   arrival: {
      driverId: number
      driver: string
      vehicleId: number
      vehicle: string
      securityId: number
      contractor: string
      state: number
   }
}

export interface IMissingDocument {
   id: number,
   name: string,
   severity: number
}

export interface IDriverInside {
   id: number;
   checkIn: moment.Moment
   driver: {
      id: number;
      name: string;
      surname: string;
   }
   vehicle: {
      id: number;
      plate: string;
   }
   contractor: {
      id: number;
      name: string
   }
}

export interface IArrival {
   id: number;
   arrivalTime: moment.Moment;
   driverId: number;
   driver: string;
   driverPhone: string;
   vehicleId: number;
   vehicle: string;
   vehicleType: string;
   securityId: number;
   contractor: string;
   palletsEntrada: string;
   pallestSalida: string;
   result: boolean | null;
   exception?:{
      id: number;
      state: number;
      managerId: number;
      comment: string;
      result: number;
   };
   exceptionId?: number;
   destination?: string;
}

export interface IVehicleType {
   id: number,
   name: string
}