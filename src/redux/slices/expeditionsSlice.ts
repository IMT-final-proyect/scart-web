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
        nonEvaluated:[]
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
        state.loading = false;
        state.success = true
        state.authorization.success = true
        state.authorization.error = initialState.error
    },
    evaluateAccessFailure(state, action: any) {
        const { payload } = action
        state.loading = false;
        state.authorization.error = payload;
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

 export const putEvaluateAccess = (id: number, result: string, expeditorId?: number, ): AppThunk => async (dispatch) => {
    dispatch(evaluateAccessRequest());
    try{
        await Axios.put(`/notifications/arrivals/${id}`, {result, expeditorId});
        dispatch(evaluateAccessSuccess());
        dispatch(_cleanSnackbar())
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