import { createAction, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { AppThunk } from '../store';

export interface IAccount {
   uuid: string;
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
   cuit: string;
   street: string;
   number: number;
   city: string;
   province: string;
   drivers?: []
   vehicles?: []
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

export const cleanState = createAction('cleanState');
export const postResetPasswordRequest = createAction('user/postResetPasswordRequest');
export const postResetPasswordSuccess = createAction('user/postResetPasswordSuccess');
export const postResetPasswordFailure = createAction('user/postResetPasswordFailure');

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      postLoginRequest(state) {
         state.loading = true;
      },
      postLoginSuccess(state, action: any) {
         const { payload } = action
         state.accountData = payload.user
         state.userData = payload.entity
         state.loading = false;
         state.error = initialState.error
      },
      postLoginFailure(state, action: any) {
         const { payload } = action
         state.userData = initialState.userData;
         state.loading = false;
         state.error = payload;
      },
      postLogout(state) {
         state = initialState;
      }
   },
});

const {
   postLoginSuccess,
   postLoginRequest,
   postLogout,
   postLoginFailure,
} = userSlice.actions;


export default userSlice.reducer;

export const postLogin = (username: string, password: string): AppThunk => async (dispatch) => {
   dispatch(postLoginRequest());
   try{
      const response = await Axios.post('/login',{
         username,
         password
      });
      localStorage.setItem('access_token', response.data.user.access_token);
      dispatch(postLoginSuccess(response.data));
   }
   catch(error){
      dispatch(postLoginFailure(error.response.data));
   }
};

export const logout = (): AppThunk => async (dispatch) => {
   dispatch(postLogout)
}
