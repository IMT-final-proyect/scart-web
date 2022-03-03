import { createStore, applyMiddleware } from 'redux';
import { Action } from '@reduxjs/toolkit'
import reduxThunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer, { initialState, RootState } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export type AppThunkDispatch = ThunkDispatch<RootState, Promise<any>, Action<string>>;

export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [reduxThunk];

export const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)