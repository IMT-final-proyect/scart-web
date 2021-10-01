import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import resourcesSlice from './slices/contractorSlices/resourcesSlice';
import userReducer, { postLogout } from './slices/userSlice';

export const initialState = {}

const appReducer = combineReducers({
    user: userReducer,
    resources: resourcesSlice
});

const rootReducer = (state: any, action: any) => {
    
    if (action.type === postLogout) {
        storage.removeItem(`persist:root`);
        state = initialState;
    }
    return appReducer(state, action);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;