import { createAction, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { IContractor } from '../../utils/interfaces';
import { AppThunk } from '../store';

export interface IAccount {
   uuid: string;
   entityId: number;
   name: string;
   surname: string;
   email: string;
   active: false;
   rol: number;
   access_token: string;
   refresh_token: string;
}

export interface IUser {
   id: number;
   name: string;
   surname?: string;
   cuit: string;
   street: string;
   number: number;
   city: string;
   province: string;
   birth_date?: string
   drivers?: []
   vehicles?: []
   contractor?: IContractor
}


interface IError {
   code: string
   message: string
}

export interface UserState {
   accountData: IAccount|null;
   userData: IUser|null;
   loading: boolean;
   error: IError|null;
}

const initialState: UserState = {
   accountData: null,
   userData: null,
   loading: false,
   error: null
};

export const postResetPasswordRequest = createAction('postResetPasswordRequest');
export const postResetPasswordSuccess = createAction('postResetPasswordSuccess');
export const postResetPasswordFailure = createAction('postResetPasswordFailure');
export const postLogout = createAction('postLogout');

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      postLoginRequest(state) {
         state.loading = true;
      },
      postLoginSuccess(state, action: any) {
         const { payload } = action
         state.accountData = payload.accountData
         state.error = initialState.error
         state.loading = false
      },
      postLoginFailure(state, action: any) {
         const { payload } = action
         state.accountData = initialState.accountData;
         state.loading = false;
         state.error = payload;
      },
      getUserDataRequest(state){
         state.loading = true;
      },
      getUserDataSuccess(state, action: any){
         const { payload } = action
         state.userData = payload
         state.error = initialState.error
         state.loading = false;
      },
      getUserDataFailure(state, action: any){
         const { payload } = action
         state.userData = initialState.userData;
         state.loading = false;
         state.error = payload;
      },
      clearLoginError(state){
         state.error =  initialState.error
      }
   },
});

const {
   postLoginSuccess,
   postLoginRequest,
   postLoginFailure,
   getUserDataRequest,
   getUserDataSuccess,
   getUserDataFailure,
   clearLoginError
} = userSlice.actions;


export default userSlice.reducer;

export const postLogin = (username: string, password: string): AppThunk => async (dispatch) => {
   dispatch(postLoginRequest());
   try{
      const response = await Axios.post('/login',{
         username,
         password
      });
      localStorage.setItem('access_token', response.data.accountData.access_token);
      dispatch(postLoginSuccess(response.data));
   }
   catch(error){
      dispatch(postLoginFailure(error.response.data));
   }
};

export const getContractorData = (id: number | undefined): AppThunk => async (dispatch) => {
   dispatch(getUserDataRequest())
   try{
      const response = await Axios.get(`/contractors/${id}`);
      dispatch(getUserDataSuccess(response.data));
   }
   catch(error){
      dispatch(getUserDataFailure(error.response.data))
   }
}

export const getDriverData = (id: number | undefined): AppThunk => async (dispatch) => {
   dispatch(getUserDataRequest())
   try{
      const response = await Axios.get(`/drivers/${id}?relations=contractor`);
      dispatch(getUserDataSuccess(response.data));
   }
   catch(error){
      dispatch(getUserDataFailure(error.response.data))
   }
}


export const clearError = (): AppThunk => async (dispatch) => {
   dispatch(clearLoginError())
}