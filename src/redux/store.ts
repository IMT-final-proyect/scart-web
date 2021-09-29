import { createStore, applyMiddleware } from 'redux';
import { Action } from '@reduxjs/toolkit'
import reduxThunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer, { initialState, RootState } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export type AppThunkDispatch = ThunkDispatch<RootState, Promise<any>, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;

const middleware = [reduxThunk];

const store =  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;