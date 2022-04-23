import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { IArrival } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
    code: string
    message: string
 }

 interface IExpeditionState {
     data: IArrival[],
     loading: boolean,
     error: IError | null,
     success: boolean,
     authorization: {
         loading: boolean,
         success: boolean,
         error: IError | null,
     }
 }

const initialState: IExpeditionState = {
    data: [],
    loading: false,
    error: null,
    success: false,
    authorization: {
        loading: false,
        success: false,
        error: null
    }
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
    evaluateAccessRequest(state) {
        state.loading = true;
        state.error = initialState.error
        state.success = initialState.success
    },
    evaluateAccessSuccess(state) {
        state.loading = false;
        state.error = initialState.error
    },
    evaluateAccessFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
    },
    cleanSnackbar(state) {
        state.error = initialState.error
        state.success = initialState.success
     }
  },
});

const {
  getArrivalsRequest,
  getArrivalsSuccess,
  getArrivalsFailure,
  evaluateAccessRequest,
  evaluateAccessSuccess,
  evaluateAccessFailure,
  cleanSnackbar
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

 export const putEvaluateAccess = (id: number, result: number, expeditorId?: number, ): AppThunk => async (dispatch) => {
    dispatch(evaluateAccessRequest());
    try{
        await Axios.put(`/notifications/arrivals/${id}`, {result, expeditorId});
        dispatch(evaluateAccessSuccess());
        dispatch(getArrivals());
    }
    catch(error: any){
        dispatch(evaluateAccessFailure(error.response.data));
    }
 };

 export const _cleanSnackbar = (): AppThunk => async (dispatch) => {
    setTimeout(() => {
       dispatch(cleanSnackbar());
     }, 6000);
 };