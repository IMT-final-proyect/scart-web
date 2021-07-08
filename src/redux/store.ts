import { createStore, compose, applyMiddleware } from 'redux';
import { Action } from '@reduxjs/toolkit'
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer, { initialState, RootState } from './rootReducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppThunkDispatch = ThunkDispatch<RootState, Promise<any>, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;

const middleware = [
    composeEnhancers(),
];

const store =  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware()),
);

export default store;