import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

 //Patient interface
 export interface USER {
   id: number;
   name: string,
   surname: string,
   email: string,
}

// User reducer state interface
export interface userState {
   // Provider's data
   data: USER|null;
   // Authentication and authorization data
   token: { accessToken: string|null; refreshToken: string|null };
}

// Payload of the post login action
interface postLoginPayload {
   accessToken: string;
   tokenType: string;
   expiresIn: number;
   refreshToken: string;
}


// User reducer initial state
const initialState: userState = {
   data: null,
   token: { accessToken: null, refreshToken: null },
};

// Clean state action, this will be defined in another slices
export const cleanState = createAction('cleanState');
export const getUserDataRequest = createAction('user/getUserDataRequest');
export const getUserDataFailure = createAction('user/getUserDataFailure');
export const postLoginRequest = createAction('user/postLoginRequest');
export const postResetPasswordRequest = createAction('user/postResetPasswordRequest');
export const postResetPasswordSuccess = createAction('user/postResetPasswordSuccess');
export const postResetPasswordFailure = createAction('user/postResetPasswordFailure');

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // Sets the token data
      setToken(
         state,
         action: PayloadAction<{ accessToken: string; refreshToken: string }>,
      ) {
         state.token = action.payload;
      },
      // Indicates a post logout request has finished successfully
      postLogoutSuccess(state) {
         state.token = initialState.token;
      },
      // Indicates a post login request has finished successfully
      postLoginSuccess(state, action: PayloadAction<postLoginPayload>) {
         const { accessToken, refreshToken } = action.payload;
         state.token.accessToken = accessToken;
         state.token.refreshToken = refreshToken;
      },
      // Indicates a post login request has failed
      postLoginFailure(state) {
         state.data = initialState.data;
         state.token = initialState.token;
      },
      // Indicates a get user data request has finished successfully
      getUserDataSuccess(state, action: PayloadAction<USER>) {
         state.data = action.payload;
      },
   },
});

const {
   getUserDataSuccess,
   postLoginSuccess,
   postLogoutSuccess,
   postLoginFailure,
} = userSlice.actions;

export const { setToken } = userSlice.actions;

// User's slice reducer
export default userSlice.reducer;