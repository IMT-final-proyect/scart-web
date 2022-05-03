import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { IDocument, IException, IMissingDocument } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');


interface IExceptionData {
    data: IException[]
    loading: boolean
    error: IError|null
    success : boolean
    evaluationLoading: boolean
    evaluationSuccess: boolean
    exceptionDocuments: IExceptionDocuments
}

interface IDriverExceptionDocuments {
   invalidDocuments: IDocument[]
   missingDocuments: IMissingDocument[]
}

interface IExceptionDocuments {
    driver: IDriverExceptionDocuments
    vehicle: IDriverExceptionDocuments
    loading: boolean
    error: IError|null
    success: boolean
}

interface IError {
   code: string
   message: string
}

const initialState: IExceptionData = {
    data: [],
    loading: false,
    error: null,
    success: false,
    evaluationLoading: false,
    evaluationSuccess: false,
    exceptionDocuments: {
      driver: {
       invalidDocuments: [],
       missingDocuments: []
      },
      vehicle: {
       invalidDocuments: [],
       missingDocuments: []
      },
      loading: false,
      error: null,
      success: false
  },
};

const exceptionsSlice = createSlice({
   name: 'exceptions',
   initialState,
   reducers: {
      getPendingExceptionsRequest(state) {
         state.loading = true;
         state.error = initialState.error
         state.evaluationSuccess = initialState.success
      },
      getPendingExceptionsSuccess(state, action: any) {
         const { payload } = action
         state.data = payload
         state.loading = false;
         state.error = initialState.error
      },
      getPendingExceptionsFailure(state, action: any) {
         const { payload } = action
         state.data = initialState.data;
         state.loading = false;
         state.error = payload;
      },
      putUpdateExceptionsRequest(state) {
         state.evaluationLoading = true;
         state.error = initialState.error
         state.success = initialState.success
      },
      putUpdateExceptionsSuccess(state) {
         state.evaluationLoading = false;
         state.error = initialState.error
         state.success = true
         state.evaluationSuccess = true
      },
      putUpdateExceptionsFailure(state, action: any) {
         const { payload } = action
         state.evaluationLoading = false;
         state.error = payload;
      },
      getInvalidDocumentsRequest(state) {
         state.exceptionDocuments.loading = true
         state.exceptionDocuments.error = initialState.exceptionDocuments.error
         state.exceptionDocuments.success = initialState.exceptionDocuments.success
      },
      getInvalidDocumentsSuccess(state, action: any) {
         const { payload } = action
         state.exceptionDocuments.driver.invalidDocuments = payload?.driver?.invalidDocuments || []
         state.exceptionDocuments.driver.missingDocuments = payload?.driver?.missingDocuments || []
         state.exceptionDocuments.vehicle.invalidDocuments = payload?.vehicle?.invalidDocuments || []
         state.exceptionDocuments.vehicle.missingDocuments = payload?.vehicle?.missingDocuments || []
         state.exceptionDocuments.loading = false
         state.exceptionDocuments.error = initialState.exceptionDocuments.error
      },
      getInvalidDocumentsFailure(state, action: any) {
         const { payload } = action
         state.exceptionDocuments.loading = false
         state.exceptionDocuments.error = payload
      },
      cleanSnackbar(state) {
         state.error = initialState.error
         state.success = initialState.success
         state.evaluationSuccess = initialState.evaluationSuccess
      }
   },
});

const {
    getPendingExceptionsSuccess,
    getPendingExceptionsRequest,
    getPendingExceptionsFailure,
    putUpdateExceptionsSuccess,
    putUpdateExceptionsRequest,
    putUpdateExceptionsFailure,
    getInvalidDocumentsRequest,
    getInvalidDocumentsSuccess,
    getInvalidDocumentsFailure,
    cleanSnackbar
} = exceptionsSlice.actions;


export default exceptionsSlice.reducer;

export const getPendingExceptions = (): AppThunk => async (dispatch) => {
   dispatch(getPendingExceptionsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/notifications/exceptions?result=null`);
      const exceptions = _.mapKeys(response.data, 'id')
      
      dispatch(getPendingExceptionsSuccess(exceptions));
   }
   catch(error: any){
      dispatch(getPendingExceptionsFailure(error.response.data));
   }
};

export const putUpdateExceptions = (exceptionId: string, comment: string, managerId: number , result: number): AppThunk => async (dispatch) => {
   dispatch(putUpdateExceptionsRequest());
   try{
      await Axios.put(`/notifications/exceptions/${exceptionId}`,
      {
         comment,
         managerId,
         result: result.toString()
      });
      dispatch(putUpdateExceptionsSuccess());
   }
   catch(error: any){
      dispatch(putUpdateExceptionsFailure(error.response.data));
   }
};

export const getInvalidDocuments = (driverId: number, vehicleId: number): AppThunk => async (dispatch) => {
   dispatch(getInvalidDocumentsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/documents/visit/validate?driverId=${driverId}&vehicleId=${vehicleId}`);
      
      dispatch(getInvalidDocumentsSuccess(response.data));
   }
   catch(error: any){
      dispatch(getInvalidDocumentsFailure(error));
   }
};


export const _cleanSnackbar = (): AppThunk => async (dispatch) => {
   setTimeout(() => {
      dispatch(cleanSnackbar());
    }, 6000);
};