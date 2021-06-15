//file for merge all reducers before send to the store
import { combineReducers } from 'redux';
import userReducer from './userSlice';
// import headerReducer from './headerReducer';
// import requestStateReducer from './requestStateReducer';

// let userLocalStorage: string = '';
// let _initialState = {}
// if (!!localStorage.getItem('user')) {
//     userLocalStorage = localStorage.getItem('user') as string;
//     const _userLocalStorage = JSON.parse(userLocalStorage);
//     _initialState = { user: _userLocalStorage }
// }
// export const initialState = { ..._initialState }
export const initialState = {}

const appReducer = combineReducers({
    user: userReducer,
    // header: headerReducer,
    // requestState: requestStateReducer,
});

const rootReducer = (state: any, action: any) => {
    
    //Return state to initialState
    // if (action.type === LOG_OUT)
    //     state = {};

    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;