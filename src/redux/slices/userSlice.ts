import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';

 export interface IUser {
   uuid: string;
   name: string;
   surname: string;
   email: string;
   active: false;
   rol: number;
   access_token: string;
   refresh_token: string;
}

interface IError {
   code: string
   message: string
}

export interface UserState {
   userData: IUser|null;
   loading: boolean
   error: IError|null
}

const initialState: UserState = {
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
         state.userData = payload
         state.loading = false;
         state.error = initialState.error
      },
      postLoginFailure(state, action: any) {
         const { payload } = action
         state.userData = initialState.userData;
         state.loading = false;
         state.error = payload;
      },
      postLogoutSuccess(state) {
         state = initialState;
      }
   },
});

const {
   postLoginSuccess,
   postLoginRequest,
   postLogoutSuccess,
   postLoginFailure,
} = userSlice.actions;

// User's slice reducer
export default userSlice.reducer;

export const postLogin = (username: string, password: string): AppThunk => async (dispatch) => {
   dispatch(postLoginRequest());
   try{
      const response = await Axios.post('/login',{
         username,
         password
      });
      dispatch(postLoginSuccess(response.data));
   }
   catch(error){
      dispatch(postLoginFailure(error.response.data));
   }
};
