import { createAction, createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { AppThunk } from '../../store';
var _ = require('lodash');

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

interface IError {
   code: string
   message: string
}

interface IDriverData {
   data: IDriver[]
   loading: boolean
   error: IError|null
}

interface IVehicleData {
   data: IVehicle[]
   loading: boolean
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
      error: null
    },
    vehicles: {
      data:[],
      loading: false,
      error: null
    }
};

export const cleanState = createAction('cleanState');
export const postResetPasswordRequest = createAction('user/postResetPasswordRequest');
export const postResetPasswordSuccess = createAction('user/postResetPasswordSuccess');
export const postResetPasswordFailure = createAction('user/postResetPasswordFailure');

const resourcesSlice = createSlice({
   name: 'user',
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
      createDriverRequest(state) {
         state.drivers.loading = true;
      },
      createDriverSuccess(state, action: any) {
         const { payload } = action
         state.drivers.data = ({...state.drivers.data, [payload.id]: {...payload}})
         state.drivers.loading = false;
         state.drivers.error = initialState.drivers.error
      },
      createDriverFailure(state, action: any) {
         const { payload } = action
         state.drivers.loading = false;
         state.drivers.error = payload;
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
   },
});

const {
    getDriversSuccess,
    getDriversRequest,
    getDriversFailure,
    createDriverRequest,
    createDriverSuccess,
    createDriverFailure,
    getVehiclesRequest,
    getVehiclesSuccess,
    getVehiclesFailure
} = resourcesSlice.actions;


export default resourcesSlice.reducer;

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
   name: string, 
   surname: string, 
   cuit: string, 
   birth_date: moment.Moment, 
   contractorId: number): AppThunk => async (dispatch) => {
   dispatch(createDriverRequest());
   try{
      const response: AxiosResponse = await Axios.post('/drivers',{
         name,
         surname,
         cuit,
         birth_date,
         contractorId
      });
      dispatch(createDriverSuccess(response.data));
   }
   catch(error){
      dispatch(createDriverFailure(error.response.data));
   }
}