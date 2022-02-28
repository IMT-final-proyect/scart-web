import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { IDriver, ISecurity, IVehicle } from '../../utils/interfaces';
import { AppThunk } from '../store';
import { IUser } from './userSlice';
var _ = require('lodash');

interface IError {
   code: string
   message: string
}

interface IDriverData {
   data: IDriver[]
   loading: boolean
   success: boolean
   error: IError|null
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
      loading: false,
      success: false,
      error: null
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
    editVehicleFailure
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
      const response: AxiosResponse = await Axios.get(`/drivers/${id}?relations=address`);      
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
      const response: AxiosResponse = await Axios.get(`/vehicles/${id}?relations=contractor`);      
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
   contractorId: number): AppThunk => async (dispatch) => {
   dispatch(createVehicleRequest());
   try{
      const response: AxiosResponse = await Axios.post('/vehicles',{
         plate,
         brand,
         model,
         year,
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
         active: 0
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
         active: 0
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
   phone: string,
   cuit: string, 
   birth_date: moment.Moment, 
   street: string,
   number: number,
   city: string,
   province: string,
   zip_code: string,
   password?: string): AppThunk => async (dispatch) => {
   dispatch(editDriverRequest());
   try{
      let body
      if (!!password) 
         body = {
            name,
            surname,
            username,
            phone,
            cuit,
            birth_date,
            address: {
               street,
               number,
               city,
               province,
               zip_code
            },
            password
         }
      else
         body = {
            name,
            surname,
            username,
            phone,
            cuit,
            birth_date,
            address: {
               street,
               number,
               city,
               province,
               zip_code
            }
         } 
      const response: AxiosResponse = await Axios.put(`/drivers/${driver.id}`,body);
      
      const editedDriver = {...driver, ...response.data}
      
      
      dispatch(editDriverSuccess(editedDriver));
   }
   catch(error: any){
      dispatch(editDriverFailure(error.response.data)); 
   }
}

export const editVehicle = (vehicle: IVehicle, plate: string, brand: string, model: string, year: number): AppThunk => async (dispatch) => {
   dispatch(editVehicleRequest());
   try{
      const response: AxiosResponse = await Axios.put(`/vehicles/${vehicle.id}`,
      {
         plate,
         brand,
         model,
         year
      })

      const editedVehicle = {...vehicle, ...response.data}

      dispatch(editVehicleSuccess(editedVehicle));
   }
   catch(error: any){
      dispatch(editVehicleFailure(error.response.data)); 
   }
}