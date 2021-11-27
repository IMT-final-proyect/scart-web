import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { IDriver, IVehicle } from '../../utils/interfaces';
import { AppThunk } from '../store';
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

export interface UserState {
   drivers: IDriverData;
   vehicles: IVehicleData;
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
    }
};

const resourcesSlice = createSlice({
   name: 'resources',
   initialState,
   reducers: {
      getAllDriversRequest(state) {
         state.drivers.loading = true;
         state.drivers.success = initialState.drivers.success;
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
   const url = contractorId !== undefined ? `/drivers?contractor=${contractorId}` : `/drivers?relations=contractor`
   try{
      const response: AxiosResponse = await Axios.get(url);
      const drivers = _.mapKeys(response.data, 'id') 
      dispatch(getAllDriversSuccess(drivers));
   }
   catch(error){
      dispatch(getAllDriversFailure(error.response.data));
   }
};

export const getDriverById = (id: number): AppThunk => async (dispatch) => {
   dispatch(getDriverByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/drivers/${id}`);
      console.log(response.data);
      
      dispatch(getDriverByIdSuccess(response.data));
   }
   catch(error){
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
   catch(error){
      dispatch(getAllVehiclesFailure(error.response));
   }
}; 

export const getVehicleById = (id: number): AppThunk => async (dispatch) => {
   dispatch(getVehicleByIdRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/vehicles/${id}`);
      console.log(response.data);
      
      dispatch(getVehicleByIdSuccess(response.data));
   }
   catch(error){
      dispatch(getVehicleByIdFailure(error.response.data));
   }
}

export const createDriver = (
   username: string,
   password: string,
   name: string, 
   surname: string, 
   cuit: string, 
   birth_date: moment.Moment, 
   contractorId: number): AppThunk => async (dispatch) => {
   dispatch(createDriverRequest());
   try{
      const response: AxiosResponse = await Axios.post('/register/driver',{
         username,
         password,
         name,
         surname,
         cuit,
         birth_date,
         contractorId
      });
      dispatch(createDriverSuccess(response.data.userData));
   }
   catch(error){
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
   catch(error){
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
   catch(error){
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
   catch(error){
      dispatch(deleteVehicleFailure(error.response.data)); 
   }
}

export const editDriver = (driver: IDriver, name: string, surname: string, cuit: string, birth_date: moment.Moment, password?: string): AppThunk => async (dispatch) => {
   dispatch(editDriverRequest());
   try{
      let body
      if (!!password) 
         body = {
            name,
            surname,
            cuit,
            birth_date,
            password
         }
      else
         body = {
            name,
            surname,
            cuit,
            birth_date
         } 
      const response: AxiosResponse = await Axios.put(`/drivers/${driver.id}`,body);
      
      const editedDriver = {...driver, ...response.data}
      
      
      dispatch(editDriverSuccess(editedDriver));
   }
   catch(error){
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
   catch(error){
      dispatch(editVehicleFailure(error.response.data)); 
   }
}