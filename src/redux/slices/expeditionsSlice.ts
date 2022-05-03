/* eslint-disable array-callback-return */
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
     data: {
         evaluated: IArrival[],
         nonEvaluated: IArrival[]
         today: IArrival[]
     },
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
    data: {
        evaluated:[],
        nonEvaluated:[],
        today: []
    },
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
        state.authorization = initialState.authorization
    },
    getArrivalsSuccess(state, action: any) {
        const { payload } = action
        state.data.evaluated = payload.evaluated
        state.data.nonEvaluated = payload.nonEvaluated
        state.loading = false;
        state.error = initialState.error
    },
    getArrivalsFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.error = payload;
    },
    evaluateAccessRequest(state) {
        state.authorization.loading = true;
        state.authorization.success = initialState.authorization.success
        state.authorization.error = initialState.authorization.error
    },
    evaluateAccessSuccess(state) {
        state.authorization.loading = false;
        state.success = true
        state.authorization.success = true
        state.authorization.error = initialState.error
    },
    evaluateAccessFailure(state, action: any) {
        const { payload } = action
        state.authorization.loading = false;
        state.authorization.error = payload;
    },
    markAsReadRequest(state) {
        state.authorization.loading = true;
        state.authorization.success = initialState.authorization.success
        state.authorization.error = initialState.authorization.error
    },
    markAsReadSuccess(state) {
        state.authorization.loading = false;
        state.success = true
        state.authorization.success = true
        state.authorization.error = initialState.error
    },
    markAsReadFailure(state, action: any) {
        const { payload } = action
        state.authorization.loading = false;
        state.authorization.error = payload;
    },
    getTodaysArrivalsRequest(state) {
        state.loading = true;
        state.error = initialState.error
        state.authorization = initialState.authorization
    },
    getTodaysArrivalsSuccess(state, action: any) {
        const { payload } = action
        state.data.today = payload.today
        state.loading = false;
        state.error = initialState.error
    },
    getTodaysArrivalsFailure(state, action: any) {
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
  markAsReadRequest,
  markAsReadSuccess,
  markAsReadFailure,
  getTodaysArrivalsRequest,
  getTodaysArrivalsSuccess,
  getTodaysArrivalsFailure,
  cleanSnackbar
} = expeditionsSlice.actions;


export default expeditionsSlice.reducer;

export const getArrivals = (): AppThunk => async (dispatch) => {
    dispatch(getArrivalsRequest());
    try{
        const response: AxiosResponse = await Axios.get(`/notifications/arrivals?state=0`);
        const arrivals: IArrival[] = response.data
        let evaluated: IArrival[] = []
        let nonEvaluated: IArrival[] = []
       
        Object.keys(arrivals).map((index: any) => {
            if(arrivals[parseInt(index)].result !== null){
                evaluated.push(arrivals[parseInt(index)])
            }
            else {
                nonEvaluated.push(arrivals[parseInt(index)])
            }
        })

        evaluated = _.mapKeys(evaluated, 'id')
        nonEvaluated= _.mapKeys(nonEvaluated, 'id')
        dispatch(getArrivalsSuccess({evaluated, nonEvaluated}));
        dispatch(_cleanSnackbar())
    }
    catch(error: any){
        dispatch(getArrivalsFailure(error.response.data));
    }
 };

 export const getTodaysArrivals = (after?: string, before?: string): AppThunk => async (dispatch) => {
    dispatch(getTodaysArrivalsRequest());
    try{
        let url = `/notifications/arrivals?`
        if (!!after){
            url = url + `after=${after}&`
        }
        if (!!before){
            url = url + `before=${before}&`
        }
        const response: AxiosResponse = await Axios.get(url);
        const today: IArrival[] = response.data
        dispatch(getTodaysArrivalsSuccess(today));
        dispatch(_cleanSnackbar())
    }
    catch(error: any){
        dispatch(getTodaysArrivalsFailure(error.response.data));
    }
 };

 export const putEvaluateAccess = (id: number, result: string, palletsSalida: number, destiny: string, expeditorId?: number): AppThunk => async (dispatch) => {
    dispatch(evaluateAccessRequest());
    try{
        await Axios.put(`/notifications/arrivals/${id}`, {result, expeditorId, palletsSalida, destiny});
        dispatch(evaluateAccessSuccess());
        dispatch(_cleanSnackbar())
    }
    catch(error: any){
        dispatch(evaluateAccessFailure(error.response.data));
    }
 };

 export const putMarkAsRead = (id: number): AppThunk => async (dispatch) => {
    dispatch(markAsReadRequest());
    try{
        await Axios.put(`/notifications/arrivals/${id}`, { state: '1' });
        dispatch(markAsReadSuccess());
        dispatch(getArrivals())
    }
    catch(error: any){
        dispatch(markAsReadFailure(error.response.data));
    }
 };

 export const _cleanSnackbar = (): AppThunk => async (dispatch) => {
    setTimeout(() => {
       dispatch(cleanSnackbar());
     }, 6000);
 };