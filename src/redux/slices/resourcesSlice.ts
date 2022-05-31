import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { IDriver, IDriverInside, ISecurity, IVehicle } from '../../utils/interfaces';
import { AppThunk } from '../store';
import { IUser } from './userSlice';
var _ = require('lodash');

interface IError {
   code: string
   message: string
}

interface IDriverData {
   data: IDriver[]
   driversInside: {
      data: IDriverInside[]
      loading: boolean
      success: boolean
      error: IError|null
   }
   loading: boolean
   success: boolean
   error: IError|null
   driverUpToDate: boolean
}

interface IVehicleData {
   data: IVehicle[]
   loading: boolean
   success: boolean
   error: IError|null
}

interface ISecurityData {
   data: ISecurity[]
   loading: boolean
   success: boolean
   error: IError|null
}


export interface UserState {
   drivers: IDriverData;
   vehicles: IVehicleData;
   securities: ISecurityData;
}

const initialState: UserState = {
    drivers: {
      data:[],
      driversInside: {
         data: [],
         loading: false,
         success: false,
         error: null,
      },
      loading: false,
      success: false,
      error: null,
      driverUpToDate: false
    },
    vehicles: {
      data:[],
      loading: false,
      success: false,
      error: null
    },
    securities: {
      data:[],
      loading: false,
      success: false,
      error: null
    }
};

const resourcesSlice = createSlice({
   name: 'resources',
   initialState,
   reducers: {
      getAllDriversRequest(state) {
         state.drivers.loading = true;
         state.drivers.success = initialState.drivers.success;
         state.drivers.error = initialState.drivers.error;
      },
      getAllDriversSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = payload
         state.drivers.loading = false;
         state.drivers.error = initialState.drivers.error
      },
      getAllDriversFailure(state, action: any) {
         const { payload } = action
         state.drivers.data = initialState.drivers.data;
         state.drivers.loading = false;
         state.drivers.error = payload;
         state.drivers.success = initialState.drivers.success;
      },
      getDriverByIdRequest(state) {
         state.drivers.loading = true;
         state.drivers.success = initialState.drivers.success;
         state.drivers.error = initialState.drivers.error;
      },
      getDriverByIdSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = {...state.drivers.data, [payload.id]: payload}
         state.drivers.loading = false;
         state.drivers.error = initialState.drivers.error
      },
      getDriverByIdFailure(state, action: any) {
         const { payload } = action
         state.drivers.data = initialState.drivers.data;
         state.drivers.loading = false;
         state.drivers.error = payload;
         state.drivers.success = initialState.drivers.success;
      },
      getSecurityByIdRequest(state) {
         state.securities.loading = true;
         state.securities.success = initialState.securities.success;
         state.securities.error = initialState.securities.error;
      },
      getSecurityByIdSuccess(state, action: any) {
         const { payload } = action
         state.securities.data = {...state.securities.data, [payload.id]: payload}
         state.securities.loading = false;
         state.securities.error = initialState.securities.error
      },
      getSecurityByIdFailure(state, action: any) {
         const { payload } = action
         state.securities.data = initialState.securities.data;
         state.securities.loading = false;
         state.securities.error = payload;
         state.securities.success = initialState.securities.success;
      },
      createDriverRequest(state) {
         state.drivers.loading = true;
         state.drivers.error = initialState.drivers.error;
         state.drivers.success = initialState.drivers.success;
      },
      createDriverSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = ({...state.drivers.data, [payload.id]: {...payload}})
         state.drivers.loading = false;
         state.drivers.success = true;
         state.drivers.error = initialState.drivers.error
      },
      createDriverFailure(state, action: any) {
         const { payload } = action
         state.drivers.loading = false;
         state.drivers.error = payload;
         state.drivers.success = initialState.drivers.success;
      },
      getAllVehiclesRequest(state) {
         state.vehicles.loading = true;
         state.vehicles.error = initialState.vehicles.error;
      },
      getAllVehiclesSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data = payload
         state.vehicles.loading = false;
         state.vehicles.error = initialState.vehicles.error
         state.vehicles.success = initialState.vehicles.success;
      },
      getAllVehiclesFailure(state, action: any) {
         const { payload } = action
         state.vehicles.data = initialState.vehicles.data;
         state.vehicles.loading = false;
         state.vehicles.error = payload;
      },
      getVehicleByIdRequest(state) {
         state.vehicles.loading = true;
         state.vehicles.success = initialState.vehicles.success;
         state.vehicles.error = initialState.vehicles.error;
      },
      getVehicleByIdSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data = {...state.vehicles.data, [payload.id]: payload}
         state.vehicles.loading = false;
         state.vehicles.error = initialState.vehicles.error
      },
      getVehicleByIdFailure(state, action: any) {
         const { payload } = action
         state.vehicles.data = initialState.vehicles.data;
         state.vehicles.loading = false;
         state.vehicles.error = payload;
         state.vehicles.success = initialState.vehicles.success;
      },
      createVehicleRequest(state) {
         state.vehicles.loading = true;
         state.vehicles.error = initialState.vehicles.error;
         state.vehicles.success = initialState.vehicles.success;
      },
      createVehicleSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data = ({...state.vehicles.data, [payload.id]: {...payload}})
         state.vehicles.loading = false;
         state.vehicles.success = true;
         state.vehicles.error = initialState.vehicles.error
      },
      createVehicleFailure(state, action: any) {
         const { payload } = action
         state.vehicles.loading = false;
         state.vehicles.error = payload;
         state.vehicles.success = initialState.vehicles.success;
      },
      deleteDriverRequest(state) {
         state.drivers.loading = true;
         state.drivers.error = initialState.drivers.error;
         state.drivers.success = initialState.drivers.success;
      },
      deleteDriverSuccess(state) {
         state.drivers.loading = false;
         state.drivers.success = true;
         state.drivers.error = initialState.drivers.error
      },
      deleteDriverFailure(state, action: any) {
         const { payload } = action
         state.drivers.loading = false;
         state.drivers.error = payload;
         state.drivers.success = initialState.drivers.success;
      },
      deleteVehicleRequest(state) {
         state.vehicles.loading = true;
         state.vehicles.error = initialState.vehicles.error;
         state.vehicles.success = initialState.vehicles.success;
      },
      deleteVehicleSuccess(state) {
         state.vehicles.loading = false;
         state.vehicles.success = true;
         state.vehicles.error = initialState.vehicles.error
      },
      deleteVehicleFailure(state, action: any) {
         const { payload } = action
         state.vehicles.loading = false;
         state.vehicles.error = payload;
         state.vehicles.success = initialState.vehicles.success;
      },
      editDriverRequest(state) {
         state.drivers.loading = true;
         state.drivers.error = initialState.drivers.error;
         state.drivers.success = initialState.drivers.success;
      },
      editDriverSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data[payload.id] = payload
         state.drivers.loading = false;
         state.drivers.success = true;
         state.drivers.error = initialState.drivers.error
      },
      editDriverFailure(state, action: any) {
         const { payload } = action
         state.drivers.loading = false;
         state.drivers.error = payload;
         state.drivers.success = initialState.drivers.success;
      },
      editVehicleRequest(state) {
         state.vehicles.loading = true;
         state.vehicles.error = initialState.vehicles.error;
         state.vehicles.success = initialState.vehicles.success;
      },
      editVehicleSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data[payload.id] = payload
         state.vehicles.loading = false;
         state.vehicles.success = true;
         state.vehicles.error = initialState.vehicles.error
      },
      editVehicleFailure(state, action: any) {
         const { payload } = action
         state.vehicles.loading = false;
         state.vehicles.error = payload;
         state.vehicles.success = initialState.vehicles.success;
      },
      isDriverUpToDateRequest(state) {
         state.drivers.loading = true;
         state.drivers.driverUpToDate = initialState.drivers.driverUpToDate;
         state.drivers.error = initialState.drivers.error;
         state.drivers.success = initialState.drivers.success;
      },
      isDriverUpToDateSuccess(state, action: any) {
         const { payload } = action
         state.drivers.driverUpToDate = payload
         state.drivers.loading = false;
         state.drivers.success = true;
         state.drivers.error = initialState.drivers.error
      },
      isDriverUpToDateFailure(state, action: any) {
         const { payload } = action
         state.drivers.loading = false;
         state.drivers.driverUpToDate = initialState.drivers.driverUpToDate;
         state.drivers.error = payload;
         state.drivers.success = initialState.drivers.success;
      },
      DriversInsideRequest(state) {
         state.drivers.driversInside.loading = true;
         state.drivers.driversInside.data = initialState.drivers.driversInside.data;
         state.drivers.driversInside.error = initialState.drivers.driversInside.error;
         state.drivers.driversInside.success = initialState.drivers.driversInside.success;
      },
      DriversInsideSuccess(state, action: any) {
         const { payload } = action
         state.drivers.driversInside.data = payload
         state.drivers.driversInside.loading = false;
      },
      DriversInsideFailure(state, action: any) {
         const { payload } = action
         state.drivers.driversInside.loading = false;
         state.drivers.driversInside.data = initialState.drivers.driversInside.data;
         state.drivers.driversInside.error = payload;
      },
      CheckOutRequest(state) {
         state.drivers.driversInside.error = initialState.drivers.error;
         state.drivers.success = initialState.drivers.success;
      },
      CheckOutSuccess(state) {
         state.drivers.driversInside.success = true;
         state.drivers.driversInside.error = initialState.drivers.error
      },
      CheckOutFailure(state, action: any) {
         const { payload } = action
         state.drivers.driversInside.error = payload;
         state.drivers.driversInside.success = initialState.drivers.success;
      },
   },
});

const {
    getAllDriversSuccess,
    getAllDriversRequest,
    getAllDriversFailure,
    getDriverByIdSuccess,
    getDriverByIdRequest,
    getDriverByIdFailure,
    createDriverRequest,
    createDriverSuccess,
    createDriverFailure,
    getAllVehiclesRequest,
    getAllVehiclesSuccess,
    getAllVehiclesFailure,
    getVehicleByIdSuccess,
    getVehicleByIdRequest,
    getVehicleByIdFailure,
    getSecurityByIdSuccess,
    getSecurityByIdRequest,
    getSecurityByIdFailure,
    createVehicleRequest,
    createVehicleSuccess,
    createVehicleFailure,
    deleteDriverRequest,
    deleteDriverSuccess,
    deleteDriverFailure,
    deleteVehicleRequest,
    deleteVehicleSuccess,
    deleteVehicleFailure,
    editDriverRequest,
    editDriverSuccess,
    editDriverFailure,
    editVehicleRequest,
    editVehicleSuccess,
    editVehicleFailure,
    isDriverUpToDateRequest,
    isDriverUpToDateSuccess,
    isDriverUpToDateFailure,
    DriversInsideRequest,
    DriversInsideSuccess,
    DriversInsideFailure,
    CheckOutRequest,
    CheckOutSuccess,
    CheckOutFailure
} = resourcesSlice.actions;


export default resourcesSlice.reducer;


export const getAllDrivers = (contractorId?: number): AppThunk => async (dispatch) => {
   dispatch(getAllDriversRequest());
   const url = contractorId !== undefined ? `/drivers?contractor=${contractorId}&relations=address` : `/drivers?relations=contractor,address`
   try{
      const response: AxiosResponse = await Axios.get(url);
      const drivers = _.mapKeys(response.data, 'id') 
      dispatch(getAllDriversSuccess(drivers));
   }
   catch(error: any){
      dispatch(getAllDriversFailure(error.response.data));
   }
};

export const getDriverById = (id: number): AppThunk => async (dispatch) => {
   dispatch(getDriverByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/drivers/${id}?relations=address,contractor`);      
      dispatch(getDriverByIdSuccess(response.data));
   }
   catch(error: any){
      dispatch(getDriverByIdFailure(error.response.data));
   }
}

export const getAllVehicles = (contractorId?: number): AppThunk => async (dispatch) => {
   dispatch(getAllVehiclesRequest());
   const url = contractorId !== undefined ? `/vehicles?contractor=${contractorId}` : `/vehicles?relations=contractor`
   try{
      const response: AxiosResponse = await Axios.get(url);
      const vehicle = _.mapKeys(response.data, 'id') 
      dispatch(getAllVehiclesSuccess(vehicle));
   }
   catch(error: any){
      dispatch(getAllVehiclesFailure(error.response));
   }
}; 

export const getVehicleById = (id: number): AppThunk => async (dispatch) => {
   dispatch(getVehicleByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/vehicles/${id}?relations=type,contractor`);      
      dispatch(getVehicleByIdSuccess(response.data));
   }
   catch(error: any){
      dispatch(getVehicleByIdFailure(error.response?.data));
   }
}

export const getSecurityById = (id: number): AppThunk => async (dispatch) => {
   dispatch(getSecurityByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/securities/${id}`);      
      dispatch(getSecurityByIdSuccess(response.data));
   }
   catch(error: any){
      dispatch(getSecurityByIdFailure(error.response?.data));
   }
}

export const createDriver = (
   username: string,
   password: string,
   name: string,
   surname: string,
   email: string,
   cuit: string,
   phone: string,
   birth_date: moment.Moment,
   street: string,
   number: number,
   city: string,
   province: string,
   zip_code: string,
   contractorId: number): AppThunk => async (dispatch) => {
   dispatch(createDriverRequest());
   try{
      const response: AxiosResponse = await Axios.post('/register/driver',{
         username,
         password,
         name,
         surname,
         email,
         cuit,
         phone,
         birth_date,
         address: {
            street,
            number,
            city,
            province,
            zip_code
         },
         contractorId
      });
      dispatch(createDriverSuccess(response.data.userData));
   }
   catch(error: any){
      dispatch(createDriverFailure(error.response.data));
   }
}

export const createVehicle = (
   plate: string,
   brand: string, 
   model: string, 
   year: string, 
   type: number,
   contractorId: number): AppThunk => async (dispatch) => {
   dispatch(createVehicleRequest());
   try{
      const response: AxiosResponse = await Axios.post('/vehicles',{
         plate,
         brand,
         model,
         year,
         type,
         contractorId
      });
      dispatch(createVehicleSuccess(response.data));
   }
   catch(error: any){
      dispatch(createVehicleFailure(error.response.data));
   }
}

export const deleteDriver = (id: number, contractorId?: number): AppThunk => async (dispatch) => {
   dispatch(deleteDriverRequest());
   try{
      await Axios.put(`/drivers/${id}`,{
         active: false
      });
      
      dispatch(deleteDriverSuccess());
      dispatch(getAllDrivers(contractorId))
   }
   catch(error: any){
      dispatch(deleteDriverFailure(error.response.data));
   }
}

export const deleteVehicle = (id: number, contractorId?: number): AppThunk => async (dispatch) => {
   dispatch(deleteVehicleRequest());
   try{
      await Axios.put(`/vehicles/${id}`,{
         active: false
      });
      
      dispatch(deleteVehicleSuccess());
      dispatch(getAllVehicles(contractorId))
   }
   catch(error: any){
      dispatch(deleteVehicleFailure(error.response.data)); 
   }
}

export const editDriver = (
   driver: IDriver | IUser, 
   name: string, 
   surname: string, 
   username: string,
   cuit: string, 
   phone: string,
   birth_date: moment.Moment, 
   email: string): AppThunk => async (dispatch) => {
   dispatch(editDriverRequest());
   try{
      const response: AxiosResponse = await Axios.put(`/drivers/${driver.id}`,
         {
            name,
            surname,
            username,
            cuit,
            phone,
            email,
            birth_date
         }
      );
      const editedDriver = {...driver, ...response.data} 
      dispatch(editDriverSuccess(editedDriver));
   }
   catch(error: any){
      dispatch(editDriverFailure(error.response.data)); 
   }
}

export const editVehicle = (vehicle: IVehicle, plate: string, type: number, brand: string, model: string, year: number): AppThunk => async (dispatch) => {
   dispatch(editVehicleRequest());
   try{
      const response: AxiosResponse = await Axios.put(`/vehicles/${vehicle.id}`,
      {
         plate,
         brand,
         model,
         type,
         "year": year.toString()
      })

      const editedVehicle = {...vehicle, ...response.data}

      dispatch(editVehicleSuccess(editedVehicle));
   }
   catch(error: any){
      dispatch(editVehicleFailure(error.response.data)); 
   }
}

export const isDriverUpToDate = (driverId?: number): AppThunk => async (dispatch) => {
   dispatch(isDriverUpToDateRequest());
   try{
      if(!!driverId){
         const response = await Axios.get(`documents/visit/validate?driverId=${driverId}`)
         const driver = response.data.driver
         let isValid = true
         if (!!driver && !!driver.invalidDocuments && !!driver.missingDocuments) isValid = false  
         dispatch(isDriverUpToDateSuccess(isValid))
      }
      else dispatch(isDriverUpToDateFailure({ code: 400, message: "Conductor no encontrado"})); 
   }
   catch(error: any){
      dispatch(isDriverUpToDateFailure(error?.response?.data)); 
   }
}

export const getDriversInsidePlant = (): AppThunk => async (dispatch) => {
   dispatch(DriversInsideRequest());
   try{
      const response = await Axios.get(`/visits/entities`)
      dispatch(DriversInsideSuccess(response.data))
   }
   catch(error: any){
      dispatch(DriversInsideFailure(error?.response?.data)); 
   }
}

export const putCheckOut = (driverId: number, vehicleId: number): AppThunk => async (dispatch) => {
   dispatch(CheckOutRequest());
   try{
      await Axios.put(`/visits/checkout`, {vehicleId, driverId})
      dispatch(CheckOutSuccess())
      dispatch(getDriversInsidePlant())
   }
   catch(error: any){
      dispatch(CheckOutFailure(error?.response?.data)); 
   }
}

export const getVehicleTypes = () => Axios.get('/vehicles/types');