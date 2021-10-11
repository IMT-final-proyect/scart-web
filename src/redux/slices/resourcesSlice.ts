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
      getDriversRequest(state) {
         state.drivers.loading = true;
      },
      getDriversSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = payload
         state.drivers.loading = false;
         state.drivers.error = initialState.drivers.error
      },
      getDriversFailure(state, action: any) {
         const { payload } = action
         state.drivers.data = initialState.drivers.data;
         state.drivers.loading = false;
         state.drivers.error = payload;
      },
      getAllDriversRequest(state) {
         state.drivers.loading = true;
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
      getVehiclesRequest(state) {
         state.vehicles.loading = true;
      },
      getVehiclesSuccess(state, action: any) {
         const { payload } = action
         state.vehicles.data = payload
         state.vehicles.loading = false;
         state.vehicles.error = initialState.vehicles.error
      },
      getVehiclesFailure(state, action: any) {
         const { payload } = action
         state.vehicles.data = initialState.vehicles.data;
         state.vehicles.loading = false;
         state.vehicles.error = payload;
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
      }
   },
});

const {
    getDriversSuccess,
    getDriversRequest,
    getDriversFailure,
    getAllDriversSuccess,
    getAllDriversRequest,
    getAllDriversFailure,
    createDriverRequest,
    createDriverSuccess,
    createDriverFailure,
    getVehiclesRequest,
    getVehiclesSuccess,
    getVehiclesFailure,
    createVehicleRequest,
    createVehicleSuccess,
    createVehicleFailure
} = resourcesSlice.actions;


export default resourcesSlice.reducer;

export const getAllDrivers = (): AppThunk => async (dispatch) => {
   dispatch(getAllDriversRequest());
   try{
      const response: AxiosResponse = await Axios.get('/drivers');
      const drivers = _.mapKeys(response.data, 'id') 
      dispatch(getAllDriversSuccess(drivers));
   }
   catch(error){
      dispatch(getAllDriversFailure(error.response.data));
   }
}

export const getDriver = (): AppThunk => async (dispatch) => {
   dispatch(getDriversRequest());
   try{
      const response: AxiosResponse = await Axios.get('/drivers');
      const drivers = _.mapKeys(response.data, 'id') 
      dispatch(getDriversSuccess(drivers));
   }
   catch(error){
      dispatch(getDriversFailure(error.response.data));
   }
};

export const getVehicle = (): AppThunk => async (dispatch) => {
   dispatch(getVehiclesRequest());
   try{
      const response: AxiosResponse = await Axios.get('/vehicles');
      const vehicle = _.mapKeys(response.data, 'id') 
      dispatch(getVehiclesSuccess(vehicle));
   }
   catch(error){
      dispatch(getVehiclesFailure(error.response));
   }
}; 

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