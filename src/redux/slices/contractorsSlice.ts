import { createSlice } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import moment from 'moment';
import { IContractor } from '../../utils/interfaces';
import { AppThunk } from '../store';
var _ = require('lodash');

interface IError {
   code: string
   message: string
}

export interface ContractorState {
    data: IContractor[]
    loading: boolean
    success: boolean
    error: IError|null
}

const initialState: ContractorState = {
    data: [],
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
   },
});

const {
    getContractorsSuccess,
    getContractorsRequest,
    getContractorsFailure,
    createContractorRequest,
    createContractorSuccess,
    createContractorFailure,
} = resourcesSlice.actions;


export default resourcesSlice.reducer;

export const getContractors = (): AppThunk => async (dispatch) => {
   dispatch(getContractorsRequest());
   try{
      const response: AxiosResponse = await Axios.get('/contractors');
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
   name: string, 
   cuit: string, 
   street: string, 
   number: string,
   city: string, 
   province: string): AppThunk => async (dispatch) => {
   dispatch(createContractorRequest());
   try{
      const response: AxiosResponse = await Axios.post('/register/Contractor',{
         username,
         password,
         name,
         cuit,
         street,
         number,
         city,
         province
      });
      dispatch(createContractorSuccess(response.data.userData));
   }
   catch(error){
      dispatch(createContractorFailure(error.response.data));
   }
}
