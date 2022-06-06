/* eslint-disable array-callback-return */
import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { IArrival, IVisit } from '../../utils/interfaces';
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
         today: IVisit[]
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
    putEditVisitRequest(state) {
        state.loading = true;
        state.success = initialState.success
        state.error = initialState.error
    },
    putEditVisitSuccess(state, action) {
        const { payload } = action
        state.loading = false;
        state.data.today[payload.id].palletsSalida = payload.palletsSalida
        state.success = true
        state.error = initialState.error
    },
    putEditVisitFailure(state, action: any) {
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
    getVisitsRequest(state) {
        state.loading = true;
        state.error = initialState.error
        state.authorization = initialState.authorization
    },
    getVisitsSuccess(state, action: any) {
        const { payload } = action
        state.data.today = payload
        state.loading = false;
        state.error = initialState.error
    },
    getVisitsFailure(state, action: any) {
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
  putEditVisitRequest,
  putEditVisitSuccess,
  putEditVisitFailure,
  markAsReadRequest,
  markAsReadSuccess,
  markAsReadFailure,
  getVisitsRequest,
  getVisitsSuccess,
  getVisitsFailure,
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

 export const getArrivalsWithoutLoading = (): AppThunk => async (dispatch) => {
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
    }
 };

 export const getVisits = (after?: string, before?: string): AppThunk => async (dispatch) => {
    dispatch(getVisitsRequest());
    try{
        let url = `/visits?expand[]=driver&expand[]=vehicle&`
        if (!!after){
            url = url + `after=${after}&`
        }
        if (!!before){
            url = url + `before=${before}&`
        }
        const response: AxiosResponse = await Axios.get(url);
        const today: IVisit[] = _.mapKeys(response.data, 'id')
        dispatch(getVisitsSuccess(today));
        dispatch(_cleanSnackbar())
    }
    catch(error: any){
        dispatch(getVisitsFailure(error?.response?.data));
    }
 };

 export const putEvaluateAccess = (id: number, result: string, destiny: string, expeditorId?: number): AppThunk => async (dispatch) => {
    dispatch(evaluateAccessRequest());
    try{
        await Axios.put(`/notifications/arrivals/${id}`, {result, expeditorId, destiny});
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

 export const putEditVisit = (id: number, palletsSalida: number): AppThunk => async (dispatch) => {
    dispatch(putEditVisitRequest());
    try{
        const response = await Axios.put(`/visits/update/${id}`, {palletsSalida});
        dispatch(putEditVisitSuccess(response.data));
        dispatch(_cleanSnackbar())
    }
    catch(error: any){
        dispatch(putEditVisitFailure(error.response.data));
    }
 };

 export const _cleanSnackbar = (): AppThunk => async (dispatch) => {
    setTimeout(() => {
       dispatch(cleanSnackbar());
     }, 6000);
 };