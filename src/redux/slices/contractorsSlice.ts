import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { IContractor, IDriver, IVehicle } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
   code: string
   message: string
}

interface IResourceIndicator {
   drivers: IDriver[]
   vehicles: IVehicle[]
   loading: boolean
   success: boolean
   error: IError|null
}

export interface ContractorState {
    data: IContractor[]
    invalid: IResourceIndicator
    pending: IResourceIndicator
    loading: boolean
    success: boolean
    error: IError|null
}

const initialState: ContractorState = {
   data: [],
   invalid: {
      drivers: [],
      vehicles: [],
      loading: false,
      success: false,
      error: null
   },
   pending: {
      drivers: [],
      vehicles: [],
      loading: false,
      success: false,
      error: null
   },
   loading: false,
   success: false,
   error: null
};

const resourcesSlice = createSlice({
   name: 'resources',
   initialState,
   reducers: {
      getContractorsRequest(state) {
         state.loading = true;
         state.error = initialState.error;
         state.success = initialState.success;
      },
      getContractorsSuccess(state, action: any) {
         const { payload } = action
         state.data = payload
         state.loading = false;
         state.error = initialState.error
      },
      getContractorsFailure(state, action: any) {
         const { payload } = action
         state.data = initialState.data;
         state.loading = false;
         state.error = payload;
      },
      createContractorRequest(state) {
         state.loading = true;
         state.error = initialState.error;
         state.success = initialState.success;
      },
      createContractorSuccess(state, action: any) {
         const { payload } = action
         state.data = ({...state.data, [payload.id]: {...payload}})
         state.loading = false;
         state.success = true;
         state.error = initialState.error
      },
      createContractorFailure(state, action: any) {
         const { payload } = action
         state.loading = false;
         state.error = payload;
         state.success = initialState.success;
      },
      getInvalidDriversRequest(state) {
         state.invalid.loading = true;
      },
      getInvalidDriversSuccess(state, action: any) {
         const { payload } = action
         state.invalid.drivers = payload
         state.invalid.loading = false;
         state.invalid.error = initialState.error
      },
      getInvalidDriversFailure(state, action: any) {
         const { payload } = action
         state.invalid.drivers = initialState.invalid.drivers;
         state.invalid.loading = false;
         state.invalid.error = payload;
      },
      getPendingDriversRequest(state) {
         state.pending.loading = true;
      },
      getPendingDriversSuccess(state, action: any) {
         const { payload } = action
         state.pending.drivers = payload
         state.pending.loading = false;
         state.pending.error = initialState.error
      },
      getPendingDriversFailure(state, action: any) {
         const { payload } = action
         state.pending.drivers = initialState.pending.drivers;
         state.pending.loading = false;
         state.pending.error = payload;
      },
      getInvalidVehiclesRequest(state) {
         state.pending.loading = true;
      },
      getInvalidVehiclesSuccess(state, action: any) {
         const { payload } = action
         state.invalid.vehicles = payload
         state.invalid.loading = false;
         state.invalid.error = initialState.error
      },
      getInvalidVehiclesFailure(state, action: any) {
         const { payload } = action
         state.invalid.vehicles = initialState.invalid.vehicles;
         state.invalid.loading = false;
         state.invalid.error = payload;
      },
      getPendingVehiclesRequest(state) {
         state.pending.loading = true;
      },
      getPendingVehiclesSuccess(state, action: any) {
         const { payload } = action
         state.pending.vehicles = payload
         state.pending.loading = false;
         state.pending.error = initialState.error
      },
      getPendingVehiclesFailure(state, action: any) {
         const { payload } = action
         state.pending.vehicles = initialState.pending.vehicles;
         state.pending.loading = false;
         state.pending.error = payload;
      },
      editContractorRequest(state) {
         state.loading = true;
         state.error = initialState.error;
         state.success = initialState.success;
      },
      editContractorSuccess(state, action: any) {
         const { payload } = action
         state.data[payload.id] = payload
         state.loading = false;
         state.success = true;
         state.error = initialState.error
      },
      editContractorFailure(state, action: any) {
         const { payload } = action
         state.loading = false;
         state.error = payload;
         state.success = initialState.success;
      },
   },
});

const {
    getContractorsSuccess,
    getContractorsRequest,
    getContractorsFailure,
    createContractorRequest,
    createContractorSuccess,
    createContractorFailure,
    getInvalidDriversSuccess,
    getInvalidDriversRequest,
    getInvalidDriversFailure,
    getPendingDriversSuccess,
    getPendingDriversRequest,
    getPendingDriversFailure,
    getInvalidVehiclesSuccess,
    getInvalidVehiclesRequest,
    getInvalidVehiclesFailure,
    getPendingVehiclesSuccess,
    getPendingVehiclesRequest,
    getPendingVehiclesFailure,
    editContractorRequest,
    editContractorSuccess,
    editContractorFailure
} = resourcesSlice.actions;


export default resourcesSlice.reducer;

export const getContractors = (): AppThunk => async (dispatch) => {
   dispatch(getContractorsRequest());
   try{
      const response: AxiosResponse = await Axios.get('/contractors?relations=address');
      const Contractors = _.mapKeys(response.data, 'id') 
      dispatch(getContractorsSuccess(Contractors));
   }
   catch(error){
      dispatch(getContractorsFailure(error.response.data));
   }
};

export const createContractor = (
   username: string,
   password: string,
   email: string,
   name: string, 
   cuit: string,
   phone: string,
   street_address: string, 
   number_address: string,
   city_address: string, 
   province_address: string): AppThunk => async (dispatch) => {
   dispatch(createContractorRequest());
   try{
      const response: AxiosResponse = await Axios.post('/register/Contractor',{
         username,
         password,
         email,
         name,
         cuit,
         phone,
         street_address,
         number_address,
         city_address,
         province_address
      });
      dispatch(createContractorSuccess(response.data.userData));
   }
   catch(error){
      dispatch(createContractorFailure(error.response.data));
   }
}

export const getInvalidDrivers = (contractorId: number): AppThunk => async (dispatch) => {
   dispatch(getInvalidDriversRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/contractors/${contractorId}/documents/drivers?states=2,3&missing=true`);
      dispatch(getInvalidDriversSuccess(response.data));
   }
   catch(error){
      dispatch(getInvalidDriversFailure(error.response.data));
   }
}

export const getPendingDrivers = (contractorId: number): AppThunk => async (dispatch) => {
   dispatch(getPendingDriversRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/contractors/${contractorId}/documents/drivers?states=0`);
      dispatch(getPendingDriversSuccess(response.data));
   }
   catch(error){
      dispatch(getPendingDriversFailure(error.response.data));
   }
}

export const getInvalidVehicles = (contractorId: number): AppThunk => async (dispatch) => {
   dispatch(getInvalidVehiclesRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/contractors/${contractorId}/documents/vehicles?states=2,3&missing=true`);
      dispatch(getInvalidVehiclesSuccess(response.data));
   }
   catch(error){
      dispatch(getInvalidVehiclesFailure(error.response.data));
   }
}

export const getPendingVehicles = (contractorId: number): AppThunk => async (dispatch) => {
   dispatch(getPendingVehiclesRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/contractors/${contractorId}/documents/vehicles?states=0`);
      dispatch(getPendingVehiclesSuccess(response.data));
   }
   catch(error){
      dispatch(getPendingVehiclesFailure(error.response.data));
   }
}

export const editContractor = (
   contractor: IContractor, 
   name: string, 
   username: string,
   email: string,
   cuit: string, 
   street: string,
   number: number,
   city: string,
   province: string,
   zip_code: string,
   password?: string): AppThunk => async (dispatch) => {
   dispatch(editContractorRequest());
   try{
      let body
      if (!!password) 
         body = {
            name,
            username,
            email,
            cuit,
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
            username,
            email,
            cuit,
            address: {
               street,
               number,
               city,
               province,
               zip_code
            }
         } 
      const response: AxiosResponse = await Axios.put(`/contractors/${contractor.id}`, body);
      
      const editedContractor = {...contractor, ...response.data}
      
      
      dispatch(editContractorSuccess(editedContractor));
   }
   catch(error){
      dispatch(editContractorFailure(error.response.data)); 
   }
}