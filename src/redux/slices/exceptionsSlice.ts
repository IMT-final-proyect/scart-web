import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { IException } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');


interface IExceptionData {
    data: IException[]
    loading: boolean
    error: IError|null
    success : boolean
}

interface IError {
   code: string
   message: string
}

const initialState: IExceptionData = {
    data: [],
    loading: false,
    error: null,
    success: false
};

const excpetionsSlice = createSlice({
   name: 'excpetions',
   initialState,
   reducers: {
      getPendingExceptionsRequest(state) {
         state.loading = true;
         state.error = initialState.error
         state.success = initialState.success
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
   },
});

const {
    getPendingExceptionsSuccess,
    getPendingExceptionsRequest,
    getPendingExceptionsFailure,
} = excpetionsSlice.actions;


export default excpetionsSlice.reducer;

export const getPendingExceptions = (): AppThunk => async (dispatch) => {
   dispatch(getPendingExceptionsRequest());
   try{
      const response: AxiosResponse = await Axios.get(`/notifications/exceptions?state=0`);
      const exceptions = _.mapKeys(response.data, 'id')
      
      dispatch(getPendingExceptionsSuccess(exceptions));
   }
   catch(error){
      dispatch(getPendingExceptionsFailure(error.response.data));
   }
};
