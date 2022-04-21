import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
    code: string
    message: string
 }

export interface IExpedition {
    id?: number;
    arrivalTime: moment.Moment;
    driver: string;
    vehicle: string;
    contractor: string;
    destiny: string;
    palletsIn: string;
    pallestOut: string;
    vehicleType: string;
    driverPhone: string;
    authorized?: boolean;
 }

 interface IExpeditionState {
     data: IExpedition[],
     loading: boolean,
     error: IError | null,
     success: boolean,
     authorizationSuccess: boolean
 }

const initialState: IExpeditionState = {
    data: [],
    loading: false,
    error: null,
    success: false,
    authorizationSuccess: false
};

const expeditionsSlice = createSlice({
  name: 'expeditions',
  initialState,
  reducers: {
    getArrivalsRequest(state) {
        state.loading = true;
        state.error = initialState.error
        state.success = initialState.success
    },
    getArrivalsSuccess(state, action: any) {
        const { payload } = action
        state.data = payload
        state.loading = false;
        state.error = initialState.error
    },
    getArrivalsFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
    },
  },
});

const {
  getArrivalsRequest,
  getArrivalsSuccess,
  getArrivalsFailure,
} = expeditionsSlice.actions;


export default expeditionsSlice.reducer;

export const getArrivals = (): AppThunk => async (dispatch) => {
    dispatch(getArrivalsRequest());
    try{
       const response: AxiosResponse = await Axios.get(`/notifications/arrivals`);
       const arrivals = _.mapKeys(response.data, 'id')
       
       dispatch(getArrivalsSuccess(arrivals));
    }
    catch(error: any){
       dispatch(getArrivalsFailure(error.response.data));
    }
 };
